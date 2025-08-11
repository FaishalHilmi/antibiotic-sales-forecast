import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import { endOfMonth, getYear, startOfMonth } from "date-fns";
import { getMonth } from "date-fns/fp";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const GET = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.name) {
      return NextResponse.json(
        {
          succes: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const salesRecap = await prisma.salesRecap.findMany();

    return NextResponse.json(
      {
        succes: true,
        message: "Berhasil mendapatkan data Rekap Penjualan",
        payload: salesRecap,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        succes: false,
        message: "Gagal mendapatkan data Rekap Penjualan",
      },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.name) {
      return NextResponse.json(
        {
          succes: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const period = formData.get("period") as string;

    if (!period) {
      return NextResponse.json(
        {
          succces: false,
          message: "Periode tidak boleh kosong!",
        },
        { status: 400 }
      );
    }

    const date = new Date(period);
    const month = getMonth(date) + 1;
    const year = getYear(date);
    const monthName = format(date, "MMMM", { locale: id });

    const existing = await prisma.salesRecap.findFirst({
      where: { month, year },
    });

    if (existing) {
      return NextResponse.json(
        {
          succes: false,
          message: `Rekap penjualan periode ${monthName} ${existing.year} sudah ada`,
        },
        { status: 409 }
      );
    }

    const startDate = startOfMonth(date);
    const endDate = endOfMonth(date);

    const transactions = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        deletedAt: null,
      },
      include: {
        details: true,
      },
    });

    if (transactions.length === 0) {
      return NextResponse.json(
        {
          succes: false,
          message: `Tidak ada transaksi penjualan periode ${monthName} ${year}`,
        },
        { status: 404 }
      );
    }

    const medicineMap = new Map<
      number,
      { quantity: number; revenue: Decimal; name: string }
    >();

    let totalSoldQuantity = 0;
    let grossRevenue = new Decimal(0);

    for (const trx of transactions) {
      for (const detail of trx.details) {
        const quantity = detail.quantity;
        const revenue = detail.subtotal;

        totalSoldQuantity += quantity;
        grossRevenue = grossRevenue.add(revenue);

        const existingMedicine = medicineMap.get(detail.medicineId);

        if (existingMedicine) {
          existingMedicine.quantity += quantity;
          existingMedicine.revenue = existingMedicine.revenue.add(revenue);
        } else {
          const medicine = await prisma.medicine.findUnique({
            where: {
              id: detail.medicineId,
            },
          });

          medicineMap.set(detail.medicineId, {
            quantity,
            revenue,
            name: medicine?.name ?? "Unknown",
          });
        }
      }
    }

    //   Cari top selling medicine

    let topMedicine: string = "";
    let maxQuantity: number = 0;
    let topMedicineId: number | null = null;

    for (const [medId, { quantity, name }] of medicineMap.entries()) {
      if (quantity > maxQuantity) {
        maxQuantity = quantity;
        topMedicine = name;
        topMedicineId = medId;
      }
    }

    const recap = await prisma.salesRecap.create({
      data: {
        month,
        year,
        totalTransactions: transactions.length,
        totalSoldQuantity,
        grossRevenue,
        topSellingMedicine: topMedicine,
        medicine: {
          connect: {
            id: topMedicineId || 1,
          },
        },
        recapDetails: {
          create: Array.from(medicineMap.entries()).map(
            ([medicineId, { quantity, revenue }]) => ({
              medicine: { connect: { id: medicineId } },
              quantitySold: quantity,
              unitPrice: revenue.dividedBy(quantity),
              totalRevenue: revenue,
            })
          ),
        },
      },
    });

    return NextResponse.json(
      { success: true, message: "Rekap penjualan berhasil dibuat.", recap },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        succes: false,
        message: "Gagal menambahkan rekap penjualan",
      },
      {
        status: 500,
      }
    );
  }
};
