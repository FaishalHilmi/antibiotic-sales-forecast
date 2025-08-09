import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StockAction } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: true, meszsage: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const medicineId = Number(id);

    const stockHistory = await prisma.stockLog.findMany({
      where: {
        medicineId,
      },
      orderBy: {
        date: "desc",
      },
      include: {
        medicine: {
          select: {
            unit: true,
          },
        },
      },
    });

    if (!stockHistory) {
      return NextResponse.json(
        {
          succes: false,
          message: "Obat tidak ditemukan",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        succes: true,
        message: "Berhasil mendapatkan riwayat stok obat",
        payload: stockHistory,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        succes: false,
        message: "Gagal mendapatkan riwayat stok obat",
      },
      { status: 501 }
    );
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: true, meszsage: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const medicineId = Number(id);

    const existingMedicine = await prisma.medicine.findUnique({
      where: {
        id: medicineId,
      },
    });

    if (!existingMedicine) {
      return NextResponse.json(
        {
          succes: false,
          message: "Obat tidak ditemukan",
        },
        { status: 404 }
      );
    }

    const formData = await req.formData();

    const quantity = formData.get("quantity") as string;
    const action = formData.get("action") as string;
    const note = formData.get("note") as string;
    let stockAction: StockAction;

    if (action == "tambah") {
      stockAction = StockAction.IN;
    } else {
      stockAction = StockAction.OUT;
    }

    const medicine = await prisma.medicine.findUnique({
      where: {
        id: medicineId,
      },
    });

    const qty = Number(quantity);
    const currentStock = medicine?.stock ?? 0;
    let updatedStock;

    if (currentStock <= 0 && action == "kurang") {
      return NextResponse.json({
        succes: false,
        message: "Stok obat 0 tidak bisa dikurangi",
      });
    }

    if (currentStock >= 0) {
      if (action == "tambah") {
        updatedStock = currentStock + qty;
      } else {
        updatedStock = currentStock - qty;
      }
    }

    await prisma.medicine.update({
      where: {
        id: medicineId,
      },
      data: {
        stock: updatedStock,
        stockLogs: {
          create: {
            action: stockAction,
            quantity: qty,
            note,
          },
        },
      },
    });

    return NextResponse.json({
      succes: true,
      message: "Berhasil update stok",
    });
  } catch (error) {
    return NextResponse.json(
      {
        succes: false,
        message: "Gagal update stok obat",
      },
      { status: 501 }
    );
  }
};
