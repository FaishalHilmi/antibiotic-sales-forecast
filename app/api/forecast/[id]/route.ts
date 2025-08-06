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
  { params }: { params: { id: string } }
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

    const medicineId = Number(params.id);

    const medicineForecastDetail = await prisma.forecastHistory.findFirst({
      where: {
        medicineId,
      },
      include: {
        medicine: {
          select: {
            name: true,
            category: true,
            price: true,
          },
        },
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

    medicineName = medicineForecastDetail.medicine.name;

    return NextResponse.json(
      {
        succes: true,
        message: `Berhasil mendapatkan detail peramalan obat ${medicineName}`,
        payload: medicineForecastDetail,
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
  { params }: { params: { id: string } }
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.name) {
      return NextResponse.json(
        { error: true, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const medicineId = parseInt(params.id);

    if (isNaN(medicineId)) {
      return NextResponse.json(
        { success: false, message: "Invalid medicine ID" },
        { status: 400 }
      );
    }

    const today = new Date();
    const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday

    // 1. Ambil minggu terakhir yang sudah isCompleted untuk obat ini
    const lastCompleted = await prisma.weeklySales.findFirst({
      where: { isCompleted: true, medicineId },
      orderBy: [{ year: "desc" }, { weekNumber: "desc" }],
    });

    // 2. Hitung minggu mulai dari setelah minggu terakhir
    let startDate = lastCompleted
      ? addWeeks(
          startOfWeek(new Date(lastCompleted.endDate), { weekStartsOn: 1 }),
          1
        )
      : startOfWeek(new Date("2024-01-01"), { weekStartsOn: 1 });

    // 3. Ambil period terakhir
    const lastPeriod = await prisma.weeklySales.findFirst({
      where: { medicineId },
      orderBy: [{ period: "desc" }],
    });
    let period = lastPeriod ? lastPeriod.period + 1 : 1;

    while (isBefore(startDate, currentWeekStart)) {
      const endDate = endOfWeek(startDate, { weekStartsOn: 1 });

      // 4. Ambil transaksi minggu ini untuk medicineId tertentu
      const transactions = await prisma.detailTransaction.findMany({
        where: {
          medicineId,
          transaction: {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
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

        const weekNumber = getWeekNumber(startDate);
        const year = startDate.getFullYear();

        // Cek apakah data sudah ada
        const existing = await prisma.weeklySales.findFirst({
          where: {
            medicineId,
            weekNumber,
            year,
          },
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

    const weeklySales = await prisma.weeklySales.findMany({
      where: { medicineId },
      orderBy: { weekNumber: "asc" },
    });

    // const quantitySold = weeklySales.map((data) => Number(data.quantitySold));

    if (weeklySales.length < 3) {
      return NextResponse.json(
        { error: "Not enough data to forecast" },
        { status: 400 }
      );
    }

    const forecastResult = calculateForecast(
      weeklySales.map((data) => ({
        weekNumber: data.weekNumber,
        year: data.year,
        quantitySold: Number(data.quantitySold),
      }))
    );

    const periodValue = `${forecastResult.results.length - 3} - ${
      forecastResult.results.length
    }`;

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

    return NextResponse.json({
      success: true,
      message: "Berhasil melakukan peramalan untuk ID obat: " + medicineId,
      // weeklySales,
      forecastHistory,
      periodValue,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Gagal melakukan peramalan" },
      { status: 500 }
    );
  }
};
