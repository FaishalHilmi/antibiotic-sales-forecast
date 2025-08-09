import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/utils/uploadImage";
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
        { error: true, meszsage: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const medicineId = Number(id);

    if (isNaN(medicineId)) {
      return NextResponse.json(
        {
          succes: false,
          message: "ID obat tidak ditemukan",
        },
        { status: 401 }
      );
    }

    const medicine = await prisma.medicine.findUnique({
      where: {
        id: medicineId,
      },
    });

    return NextResponse.json({
      succes: true,
      message: "Berhasil mendapatkan data berdasarkan ID",
      payload: medicine,
    });
  } catch (error) {
    return NextResponse.json({
      succes: false,
      message: "Gagal mendapatkan data obat berdasarkan ID",
    });
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.name) {
      return NextResponse.json(
        { error: true, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const { id } = await params;
    const medicineId = Number(id);

    const existingMedicine = await prisma.medicine.findUnique({
      where: {
        id: medicineId,
      },
    });

    if (!existingMedicine) {
      return NextResponse.json({
        error: true,
        message: "Obat tidak ditemukan.",
      });
    }

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const unit = formData.get("unit") as string;
    const price = formData.get("price") as string;
    const image = formData.get("image") as File | null;
    let imageUrl: string = existingMedicine.imagePath || "";

    if (image && image.size > 0) {
      const uploaded = await uploadImage(image);

      if (uploaded) {
        imageUrl = uploaded;
      }
    }

    await prisma.medicine.update({
      where: {
        id: medicineId,
      },
      data: {
        name,
        category,
        unit,
        price,
        imagePath: imageUrl,
      },
    });

    return NextResponse.json({
      succes: true,
      message: "Berhasil mengubah data obat",
    });
  } catch (error) {
    return NextResponse.json({
      succes: false,
      message: "Gagal mengubah data obat",
    });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.name) {
      return NextResponse.json(
        { error: true, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const id = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        {
          succes: false,
          message: "ID obat tidak ditemukan",
        },
        { status: 401 }
      );
    }

    await prisma.medicine.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        succces: true,
        message: "Berhasil menghapus obat",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        succes: false,
        message: "Gagal menghapus obat",
      },
      { status: 500 }
    );
  }
};
