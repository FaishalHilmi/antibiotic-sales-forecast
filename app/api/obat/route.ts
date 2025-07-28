import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData(); // ✅ betul

    const nama_obat = formData.get("nama_obat");
    const kategori = formData.get("kategori");
    const satuan = formData.get("satuan");
    const harga = formData.get("harga");
    const gambar = formData.get("gambar");

    // console.log(body);

    return NextResponse.json(
      {
        succes: true,
        message: "Berhasil menambahkan obat",
        data: {
          nama_obat,
          kategori,
          satuan,
          harga,
          gambar: gambar instanceof File ? gambar.name : null,
        },
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
