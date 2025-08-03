import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import { endOfMonth, startOfMonth } from "date-fns";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) => {
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

    const id = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        {
          succes: false,
          message: "ID rekap penjualan tidak ditemukan",
        },
        { status: 401 }
      );
    }

    const saleRecap = await prisma.salesRecap.findUnique({
      where: {
        id,
      },
      include: {
        recapDetails: {
          include: {
            medicine: {
              select: {
                name: true,
                unit: true,
              },
            },
          },
        },
      },
    });

    if (!saleRecap) {
      return NextResponse.json(
        {
          succes: false,
          message: "Rekap penjualan tidak ditemukan",
        },
        { status: 404 }
      );
    }

    const topFiveMedicines = await prisma.salesRecapDetail.findMany({
      where: {
        salesRecapId: id,
      },
      include: {
        medicine: true,
      },
      orderBy: {
        quantitySold: "desc",
      },
      take: 5,
    });

    const dataTopFiveMedicines = topFiveMedicines.map((item) => ({
      name: item.medicine.name,
      quantity: item.quantitySold,
    }));

    return NextResponse.json(
      {
        succes: true,
        message: "Berhasil mendapatkan data Rekap Penjualan berdasarkan ID",
        payload: { saleRecap, dataTopFiveMedicines },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        succes: false,
        message: "Gagal mendapatkan data Rekap Penjualan berdasarkan ID",
      },
      { status: 500 }
    );
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
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

    const id = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        {
          succes: false,
          message: "ID rekap penjualan tidak ditemukan",
        },
        { status: 401 }
      );
    }

    const existingRecap = await prisma.salesRecap.findUnique({
      where: {
        id,
      },
      include: {
        medicine: true,
      },
    });

    if (!existingRecap) {
      return NextResponse.json(
        {
          succes: false,
          message: "Rekap penjualan tidak ditemukan",
        },
        { status: 404 }
      );
    }

    const { month, year } = existingRecap;
    const startDate = startOfMonth(new Date(year, month - 1));
    const endDate = endOfMonth(startDate);

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

        const existing = medicineMap.get(detail.medicineId);

        if (existing) {
          existing.quantity += quantity;
          existing.revenue = existing.revenue.add(revenue);
        } else {
          const medicine = await prisma.medicine.findUnique({
            where: { id: detail.medicineId },
          });

          medicineMap.set(detail.medicineId, {
            quantity,
            revenue,
            name: medicine?.name ?? "Unknown",
          });
        }
      }
    }

    // Cari top selling medicine
    let topMedicine: string = "";
    let maxQuantity = 0;
    let topMedicineId: number | null = null;

    for (const [medId, { quantity, name }] of medicineMap.entries()) {
      if (quantity > maxQuantity) {
        maxQuantity = quantity;
        topMedicine = name;
        topMedicineId = medId;
      }
    }

    // Hapus recapDetails lama dulu
    await prisma.salesRecapDetail.deleteMany({
      where: { salesRecapId: id },
    });

    // Update recap dan buat ulang recapDetails
    const updatedRecap = await prisma.salesRecap.update({
      where: { id },
      data: {
        totalTransactions: transactions.length,
        totalSoldQuantity,
        grossRevenue,
        topSellingMedicine: topMedicine,
        medicine: {
          connect: { id: topMedicineId ?? 1 },
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
      include: {
        recapDetails: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Rekap penjualan berhasil diperbarui",
        payload: updatedRecap,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: true,
        message: "Rekap penjualan gagal diperbarui",
      },
      { status: 500 }
    );
  }
};
