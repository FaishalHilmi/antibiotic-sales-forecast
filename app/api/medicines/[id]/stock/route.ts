import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StockAction } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: true, meszsage: "Unauthorized" },
        { status: 401 }
      );
    }

    const medicineId = Number(params.id);

    if (isNaN(medicineId)) {
      return NextResponse.json({
        succes: false,
        message: "ID obat tidak ditemukan",
      });
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
      message: "Berhasil menambahkan stok",
    });
  } catch (error) {
    return NextResponse.json({
      succes: false,
      message: "Gagal menambahkan stok obat",
    });
  }
};
