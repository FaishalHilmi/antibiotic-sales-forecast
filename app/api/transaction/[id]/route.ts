import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.name) {
      return NextResponse.json(
        { error: true, meszsage: "Unauthorized" },
        { status: 401 }
      );
    }

    const transactions = await prisma.transaction.findUnique({
      where: {
        id,
      },
      include: {
        details: true,
        cashier: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!transactions) {
      return NextResponse.json(
        {
          success: false,
          message: "Transaksi tidak ditemukan",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        succces: true,
        message: "Berhasil mendapatkan data transaksi berdasarkan ID",
        payload: transactions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("ERROR:", error);
    return NextResponse.json(
      {
        succes: false,
        message: "Gagal mendapatkan data transaksi berdasarkan ID",
      },
      { status: 404 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.name) {
      return NextResponse.json(
        { error: true, meszsage: "Unauthorized" },
        { status: 401 }
      );
    }

    //   Ambil data dari tabel detail transaction
    const details = await prisma.detailTransaction.findMany({
      where: {
        transactionId: id,
      },
    });

    //   Kembalikan stock ke tabel medicine
    for (const detail of details) {
      await prisma.medicine.update({
        where: {
          id: detail.medicineId,
        },
        data: {
          stock: {
            increment: detail.quantity,
          },
        },
      });
    }

    await prisma.transaction.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        succes: true,
        message: "Berhasil membatalkan transaksi dan mengembalikan stok",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        succes: false,
        message: "Gagal membatalkan transaksi",
      },
      { status: 500 }
    );
  }
};
