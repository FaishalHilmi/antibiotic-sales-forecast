import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

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

    if (role === "Kasir") {
      newRole = Role.CASHIER;
    } else {
      newRole = Role.PHARMACIST;
    }

    console.log(newRole);

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
