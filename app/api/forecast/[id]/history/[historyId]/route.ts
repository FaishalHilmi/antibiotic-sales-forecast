import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { historyId: string } }
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.name) {
      return NextResponse.json(
        { error: true, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // const historyId = Number(params.historyId);
    const { historyId } = await context.params;
    const parsedHistoryId = Number(historyId);

    if (isNaN(parsedHistoryId)) {
      return NextResponse.json(
        {
          succes: false,
          message: "ID riwayat tidak ditemukan",
        },
        { status: 404 }
      );
    }

    const forecastResult = await prisma.forecastResult.findMany({
      where: {
        historyId: parsedHistoryId,
      },
    });

    console.log("forecastResult", forecastResult.length);

    if (forecastResult.length == 0) {
      return NextResponse.json(
        {
          succes: false,
          message: "Tidak ada riwayat peramalan",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        succes: true,
        message: "Berhasil mendapatkan detail riwayat peramalan",
        payload: forecastResult,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        succes: false,
        message: "Gagal mendapatkan detail riwayat peramalan",
      },
      { status: 500 }
    );
  }
};
