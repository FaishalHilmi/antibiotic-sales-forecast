import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { LastSevenDaysProps } from "@/types/summary";
import { format, startOfDay, subDays } from "date-fns";
import { endOfDay } from "date-fns/fp";
import { id } from "date-fns/locale";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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

    const today = new Date();
    const startDate = startOfDay(today);
    const endDate = endOfDay(today);

    // Menjumlahkan data total penjualan hari ini
    const totalItem = await prisma.transaction.aggregate({
      _sum: {
        totalItems: true,
      },
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        deletedAt: null,
      },
    });

    // Menghitung pendapatan penjualan hari ini
    const totalRevenue = await prisma.transaction.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        deletedAt: null,
      },
    });

    // Menghitung jumlah obat
    const totalMedicines = await prisma.medicine.count({
      where: {
        deletedAt: null,
      },
    });

    // Data penjualan dalam 7 hari
    const lastSevenDaysData: LastSevenDaysProps[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = subDays(today, i);
      const dayStart = startOfDay(date);
      const dayEnd = endOfDay(date);

      const sales = await prisma.transaction.aggregate({
        _sum: {
          totalItems: true,
        },
        where: {
          createdAt: {
            gte: dayStart,
            lte: dayEnd,
          },
          deletedAt: null,
        },
      });

      lastSevenDaysData.push({
        date: format(date, "dd MMM yyyy", { locale: id }),
        day: format(date, "EEEE", { locale: id }),
        total: sales._sum.totalItems || 0,
      });
    }

    // Ambil 5 data transaksi terakhir
    const latestTransactions = await prisma.transaction.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        deletedAt: null,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        cashier: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      succes: true,
      message: "Berhasil mendapatkan ringkasan data",
      payload: {
        total_item: totalItem._sum.totalItems,
        total_revenue: totalRevenue._sum.totalAmount,
        total_medicines: totalMedicines,
        seven_days_sales: lastSevenDaysData,
        latest_transactions: latestTransactions,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        succes: false,
        message: "Gagal mendapatkan ringkasan data",
      },
      {
        status: 500,
      }
    );
  }
};
