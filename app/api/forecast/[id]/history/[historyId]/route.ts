import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { historyId: string; id: string } }
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.name) {
      return NextResponse.json(
        { error: true, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { historyId, id } = await context.params;
    const parsedHistoryId = Number(historyId);
    const medicineId = Number(id);

    const forecastingResult = await prisma.forecastResult.findMany({
      where: {
        historyId: parsedHistoryId,
      },
    });

    if (forecastingResult.length == 0) {
      return NextResponse.json(
        {
          succes: false,
          message: "Tidak ada riwayat peramalan",
        },
        { status: 404 }
      );
    }

    const forecastingSummary = await prisma.forecastSummary.findUnique({
      where: {
        historyId: parsedHistoryId,
      },
      select: {
        weightMethod: true,
        avgMae: true,
        avgMape: true,
      },
    });

    if (!forecastingSummary) {
      return NextResponse.json(
        {
          succes: false,
          message: "Tidak ada ringkasan riwayat peramalan",
        },
        { status: 404 }
      );
    }

    const medicine = await prisma.medicine.findUnique({
      where: {
        id: medicineId,
      },
    });

    return NextResponse.json(
      {
        succes: true,
        message: "Berhasil mendapatkan detail riwayat peramalan",
        payload: {
          forecastingResult,
          forecastingSummary,
          medicine,
        },
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
