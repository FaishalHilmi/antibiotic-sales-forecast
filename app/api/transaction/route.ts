import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateTransactionId } from "@/utils/generateTransactionId";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
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

    const transactions = await prisma.transaction.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        cashier: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      succes: true,
      message: "Berhasil mendapatkan data",
      payload: transactions,
    });
  } catch (error) {
    return NextResponse.json(
      {
        succes: false,
        message: "Gagal melakukan transaksi",
      },
      {
        status: 404,
      }
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

    const cashierId = Number(session.user.id);
    const transactionId = generateTransactionId();

    const formData = await req.formData();
    const paymentMethod = formData.get("paymentmethod") as string;
    const rawItem = formData.get("items") as string;

    if (!paymentMethod || !rawItem) {
      return NextResponse.json(
        {
          succces: false,
          message: "Data transaksi tidak lengkap",
        },
        { status: 400 }
      );
    }

    const items = JSON.parse(rawItem) as {
      medicineId: number;
      quantity: number;
      unitPrice: number;
      subtotal: number;
    }[];

    const totalItems = items.reduce(
      (sum: number, item: any) => sum + item.quantity,
      0
    );

    const totalAmount = items.reduce(
      (sum: number, item: any) => sum + item.subtotal,
      0
    );

    await prisma.$transaction(async (tx) => {
      // Buat transaksi
      await tx.transaction.create({
        data: {
          id: transactionId,
          cashierId,
          paymentMethod,
          totalItems,
          totalAmount,
          details: {
            createMany: {
              data: items.map((item) => ({
                medicineId: item.medicineId,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                subtotal: item.subtotal,
              })),
            },
          },
        },
      });

      // Kurangi stok untuk setiap obat
      for (const item of items) {
        const medicine = await tx.medicine.findUnique({
          where: { id: item.medicineId },
          select: { stock: true, name: true },
        });

        if (!medicine) {
          throw new Error(`Obat dengan ID ${item.medicineId} tidak ditemukan`);
        }

        if (medicine.stock === null) {
          throw new Error(`Stok obat ${medicine.name} tidak tersedia`);
        }

        if (medicine.stock < item.quantity) {
          throw new Error(
            `Stok tidak cukup untuk obat ${medicine.name} (tersisa ${medicine.stock}, diminta ${item.quantity})`
          );
        }

        await tx.medicine.update({
          where: {
            id: item.medicineId,
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }
    });

    // Ambil data transaksi lengkap setelah berhasil dibuat
    const createdTransaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
      include: {
        cashier: {
          select: {
            id: true,
            name: true,
          },
        },
        details: {
          select: {
            quantity: true,
            unitPrice: true,
            subtotal: true,
            medicine: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!createdTransaction) {
      throw new Error("Transaksi tidak ditemukan setelah dibuat.");
    }

    const formattedTransaction = {
      transactionId: createdTransaction.id,
      datetime: createdTransaction.createdAt.toLocaleString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      }),
      cashierName: createdTransaction.cashier.name,
      items: createdTransaction.details.map((detail) => ({
        name: detail.medicine.name,
        qty: detail.quantity,
        price: detail.unitPrice,
        subtotal: detail.subtotal,
      })),
      totalPayment: createdTransaction.totalAmount,
    };

    return NextResponse.json(
      {
        succes: true,
        message: "Berhasil melakukan transaksi",
        payload: formattedTransaction,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        succes: false,
        message:
          error instanceof Error ? error.message : "Gagal melakukan transaksi",
      },
      {
        status: 404,
      }
    );
  }
};
