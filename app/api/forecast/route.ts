import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.name) {
      return NextResponse.json(
        { error: true, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const categoryMedicine: string = "antibiotik";

    const antibioticMedicines = await prisma.medicine.findMany({
      where: {
        category: categoryMedicine,
      },
    });

    return NextResponse.json(
      {
        succes: true,
        message: "Berhasil mendapatkan data obat antibiotik",
        antibioticMedicines,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        succes: false,
        message: "Gagal mendapatkan data obat antibiotik",
      },
      { status: 500 }
    );
  }
};
