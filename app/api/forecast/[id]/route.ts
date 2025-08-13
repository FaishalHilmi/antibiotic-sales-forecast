// Code agregasi hanya akan dilakukan untuk minggu-minggu penuh yang sudah berlalu
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { startOfWeek, endOfWeek, addWeeks, isBefore } from "date-fns";
import { calculateForecast } from "@/lib/forecasting";
import { getWeekNumber } from "@/utils/date";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  let medicineName: string = "";

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.name) {
      return NextResponse.json(
        { error: true, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const medicineId = Number(id);

    const existingMedicine = await prisma.medicine.findUnique({
      where: {
        id: medicineId,
      },
      select: {
        id: true,
        name: true,
        category: true,
        price: true,
      },
    });

    if (!existingMedicine) {
      return NextResponse.json({
        succes: false,
        message: "ID obat tidak ditemukan",
      });
    }

    const medicineForecastDetail = await prisma.forecastHistory.findMany({
      where: {
        medicineId,
      },
    });

    if (!medicineForecastDetail) {
      return NextResponse.json(
        {
          succes: false,
          message: "ID obat tidak ditemukan",
        },
        { status: 404 }
      );
    }

    medicineName = existingMedicine.name;

    return NextResponse.json(
      {
        succes: true,
        message: `Berhasil mendapatkan detail peramalan obat ${medicineName}`,
        payload: {
          medicine: existingMedicine,
          medicineForecastDetail,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        succes: false,
        message: `Gagal mendapatkan detail peramalan obat ${medicineName}`,
      },
      { status: 500 }
    );
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    // 1️⃣ Cek session login
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.name) {
      return NextResponse.json(
        { error: true, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2️⃣ Ambil dan validasi medicineId
    const { id } = await params;
    const medicineId = Number(id);
    if (isNaN(medicineId)) {
      return NextResponse.json(
        { success: false, message: "Invalid medicine ID" },
        { status: 400 }
      );
    }

    // 3️⃣ Tentukan minggu awal perhitungan
    const today = new Date();
    const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday
    const lastCompleted = await prisma.weeklySales.findFirst({
      where: { isCompleted: true, medicineId },
      orderBy: [{ year: "desc" }, { weekNumber: "desc" }],
    });

    let startDate = lastCompleted
      ? addWeeks(
          startOfWeek(new Date(lastCompleted.endDate), { weekStartsOn: 1 }),
          1
        )
      : startOfWeek(new Date("2024-01-01"), { weekStartsOn: 1 });

    // 4️⃣ Tentukan period awal (TIDAK RESET tiap tahun)
    const lastPeriod = await prisma.weeklySales.findFirst({
      where: { medicineId },
      orderBy: [{ period: "desc" }],
    });
    let period = lastPeriod ? lastPeriod.period + 1 : 1;

    // 5️⃣ Loop per minggu hingga minggu sekarang
    while (isBefore(startDate, currentWeekStart)) {
      const endDate = endOfWeek(startDate, { weekStartsOn: 1 });

      // Ambil transaksi minggu ini untuk medicineId
      const transactions = await prisma.detailTransaction.findMany({
        where: {
          medicineId,
          transaction: {
            createdAt: { gte: startDate, lte: endDate },
            deletedAt: null,
          },
        },
      });

      if (transactions.length > 0) {
        const quantitySold = transactions.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalRevenue = transactions.reduce(
          (sum, item) => sum + Number(item.subtotal),
          0
        );

        const weekNumber = getWeekNumber(startDate); // Reset tiap awal tahun
        const year = startDate.getFullYear();

        // Cek apakah data minggu ini sudah ada
        const existing = await prisma.weeklySales.findFirst({
          where: { medicineId, weekNumber, year },
        });

        if (!existing) {
          await prisma.weeklySales.create({
            data: {
              medicineId,
              weekNumber,
              year,
              period,
              startDate,
              endDate,
              quantitySold,
              totalRevenue,
              isCompleted: true,
            },
          });
          period++; // Increment period setelah insert
        }
      }

      startDate = addWeeks(startDate, 1); // lanjut minggu berikutnya
    }

    // 6️⃣ Ambil semua data weeklySales untuk forecast
    const weeklySales = await prisma.weeklySales.findMany({
      where: { medicineId },
      orderBy: { period: "asc" },
    });

    if (weeklySales.length < 3) {
      return NextResponse.json(
        { error: "Not enough data to forecast" },
        { status: 400 }
      );
    }

    // 7️⃣ Hitung forecast
    const forecastResult = calculateForecast(
      weeklySales.map((data) => ({
        period: data.period,
        year: data.year,
        quantitySold: Number(data.quantitySold),
      }))
    );

    const periodValue = `${forecastResult.results.length - 3} - ${
      forecastResult.results.length
    }`;

    // 8️⃣ Simpan history forecast
    const forecastHistory = await prisma.forecastHistory.create({
      data: {
        medicineId,
        forecastDate: new Date(),
        period: periodValue,
        forecastResults: {
          create: forecastResult.results.map((res) => ({
            periodLabel: res.periodLabel,
            actualValue: res.actualValue ?? null,
            forecastValue: res.forecastValue ?? null,
            mape: res.mape ?? null,
            mae: res.mae ?? null,
          })),
        },
        summary: {
          create: {
            weightMethod: JSON.stringify(forecastResult.bestWeights),
            avgMae: forecastResult.avgMae,
            avgMape: forecastResult.avgMape,
          },
        },
      },
    });

    // 9️⃣ Response sukses
    return NextResponse.json({
      success: true,
      message: "Berhasil melakukan peramalan untuk ID obat: " + medicineId,
      forecastHistory,
      weeklySales,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Gagal melakukan peramalan" },
      { status: 500 }
    );
  }
};
