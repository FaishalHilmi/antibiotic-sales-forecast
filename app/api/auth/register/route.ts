import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
import { uploadImage } from "@/utils/uploadImage";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;
    const image = formData.get("image") as File | null;

    if (!name || !username || !password || !role) {
      return NextResponse.json(
        {
          succes: false,
          message: "Semua kolom harus diisi",
        },
        { status: 400 }
      );
    }

    let newRole: Role;
    let imageUrl: string = "/profile-dummy.png";

    if (role === "Kasir") {
      newRole = Role.CASHIER;

      // Hanya kalau image tersedia dan ada isinya
      if (image && image.size > 0) {
        const uploaded = await uploadImage(image);
        if (uploaded) {
          imageUrl = uploaded;
        }
      }
    } else {
      newRole = Role.PHARMACIST;
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return NextResponse.json(
        {
          succes: false,
          message: "Username sudah terdaftar",
        },
        { status: 400 }
      );
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        username,
        password: hashedPassword,
        role: newRole,
        imagePath: imageUrl,
      },
    });

    return NextResponse.json(
      {
        succes: true,
        message: "Register berhasil",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        succes: false,
        message: "Register Gagal",
      },
      { status: 500 }
    );
  }
};
