import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export const GET = async (req: NextResponse) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.name) {
      return NextResponse.json(
        { error: true, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const medicines = await prisma.medicine.findMany({
      where: {
        deletedAt: null,
      },
    });

    return NextResponse.json({
      succes: true,
      message: "Berhasil mendapatkan data",
      payload: medicines,
    });
  } catch (error) {
    return NextResponse.json({
      succes: false,
      message: "Gagal mendapatkan data obat",
    });
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

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const unit = formData.get("unit") as string;
    const price = formData.get("price") as string;
    const image = formData.get("image") as File | null;
    let imageUrl: string = "";

    if (image && image.size > 0) {
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const buffer = Buffer.from(await image.arrayBuffer());
      const fileName = `${Date.now()}-${image.name}`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);

      imageUrl = `/uploads/${fileName}`;
    }

    await prisma.medicine.create({
      data: {
        name,
        category,
        unit,
        price: Number(price),
        imagePath: imageUrl,
      },
    });

    return NextResponse.json(
      {
        succes: true,
        message: "Berhasil menambahkan obat",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        succes: false,
        message: "Gagal menambahkan obat",
      },
      { status: 500 }
    );
  }
};
