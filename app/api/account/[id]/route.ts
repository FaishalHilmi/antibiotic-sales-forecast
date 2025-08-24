import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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

    const { id } = await params;
    const userId = Number(id);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        imagePath: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        succes: false,
        message: "ID pengguna tidak ditemukan",
      });
    }

    return NextResponse.json({
      succes: true,
      message: "Berhasil mendapatkan data pengguna",
      payload: user,
    });
  } catch (error) {
    return NextResponse.json(
      {
        succes: false,
        message: "Gagal mendapatkan data pengguna",
      },
      { status: 501 }
    );
  }
};
