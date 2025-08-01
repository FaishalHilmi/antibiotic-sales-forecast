import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/utils/uploadImage";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = Number(params.id);
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

    if (isNaN(id)) {
      return NextResponse.json(
        {
          succes: false,
          message: "ID tidak ditemukan",
        },
        { status: 401 }
      );
    }

    const cashierAccount = await prisma.user.findUnique({
      where: {
        id,
        role: Role.CASHIER,
        deletedAt: null,
      },
    });

    if (!cashierAccount) {
      return NextResponse.json(
        {
          succes: false,
          message: "Akun kasir tidak ditemukan",
        },
        { status: 401 }
      );
    }
    return NextResponse.json({
      succes: true,
      message: "Berhasil mendapatkan data kasi berdasarkan ID",
      payload: cashierAccount,
    });
  } catch (error) {
    return NextResponse.json(
      {
        succes: false,
        message: "Gagal mendapatkan data kasir berdasarkan ID",
      },
      { status: 500 }
    );
  }
};

export const PUT = async (
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
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const role = formData.get("role") as string;
    const password = formData.get("password") as string;
    const image = formData.get("image") as File | null;

    let newRole: Role;
    let imageUrl: string = "/profile-dummy.png";

    if (role === "CASHIER") {
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

    // Cek apakah username sudah digunakan user lain (selain id yang ini)
    const existingUsername = await prisma.user.findFirst({
      where: {
        username,
        NOT: {
          id: id,
        },
      },
    });

    if (existingUsername) {
      return NextResponse.json(
        {
          success: false,
          message: "Username sudah digunakan oleh akun lain",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
        role: Role.CASHIER,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    let finalPassword = user.password;

    // Jika password berbeda, hash ulang
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (!isSamePassword) {
      finalPassword = await bcrypt.hash(password, 10);
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        username,
        password: finalPassword,
        role: newRole,
        imagePath: imageUrl,
      },
    });

    return NextResponse.json({
      succes: true,
      message: "Berhasil mengubah data akun kasir",
    });
  } catch (error) {
    return NextResponse.json({
      succes: false,
      message: "Gagal mengubah data akun kasir",
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
          succces: false,
          message: "ID kasir tidak ditemukan",
        },
        { status: 401 }
      );
    }

    await prisma.user.update({
      where: {
        id,
        role: Role.CASHIER,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        succes: true,
        message: "Berhasil menghapus obat",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        succes: false,
        message: "Gagal menghapus akun kasir",
      },
      { status: 500 }
    );
  }
};
