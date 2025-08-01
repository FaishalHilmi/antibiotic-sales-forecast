import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
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

    const cashierAccounts = await prisma.user.findMany({
      where: {
        role: Role.CASHIER,
        deletedAt: null,
      },
    });

    return NextResponse.json({
      succes: true,
      message: "Berhasil mendapatkan data kasir",
      payload: cashierAccounts,
    });
  } catch (error) {
    return NextResponse.json(
      {
        succes: false,
        message: "Gagal mendapatkan data kasir",
      },
      { status: 500 }
    );
  }
};
