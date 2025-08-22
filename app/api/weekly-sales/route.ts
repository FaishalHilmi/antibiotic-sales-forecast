import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function POST(req: Request) {
  try {
    // Ambil file dari form-data
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Baca file sebagai buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Baca workbook tanpa mengonversi tanggal secara otomatis
    const workbook = XLSX.read(buffer, { type: "buffer", cellDates: false });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Konversi sheet ke JSON
    const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, { raw: true });

    // Mapping ke format database
    const dataToInsert = jsonData.map((row) => {
      // Periksa apakah row.startDate dan row.endDate ada
      if (row.startDate === undefined || row.endDate === undefined) {
        throw new Error(
          "Data tanggal tidak valid atau tidak ditemukan di file Excel."
        );
      }

      // XLSX menyimpan tanggal sebagai angka. Gunakan XLSX.SSF.parse_date_code untuk mengonversi.
      const excelStartDate = XLSX.SSF.parse_date_code(row.startDate, {
        cellDates: true,
      });
      const excelEndDate = XLSX.SSF.parse_date_code(row.endDate, {
        cellDates: true,
      });

      // Buat objek Date dari angka
      const startDate = new Date(
        excelStartDate.y,
        excelStartDate.m - 1,
        excelStartDate.d,
        excelStartDate.H,
        excelStartDate.M,
        excelStartDate.S
      );
      const endDate = new Date(
        excelEndDate.y,
        excelEndDate.m - 1,
        excelEndDate.d,
        excelEndDate.H,
        excelEndDate.M,
        excelEndDate.S
      );

      // Kita harus mengoreksi tanggal dengan menambahkan offset UTC+7 (7 jam)
      // agar tanggal yang disimpan di database sesuai dengan WIB.
      const offsetInMs = 7 * 60 * 60 * 1000; // 7 jam dalam milidetik

      // Mengoreksi tanggal. getTime() mengembalikan milidetik sejak Epoch (1970-01-01T00:00:00Z)
      // Kita tambahkan offset untuk mendapatkan waktu yang benar di zona WIB
      const correctedStartDate = new Date(startDate.getTime() + offsetInMs);
      const correctedEndDate = new Date(endDate.getTime() + offsetInMs);

      return {
        weekNumber: Number(row.weekNumber),
        year: Number(row.year),
        period: Number(row.period),
        startDate: correctedStartDate,
        endDate: correctedEndDate,
        isCompleted: row.isCompleted === "TRUE" || row.isCompleted === true,
        medicineId: Number(row.medicineId),
        quantitySold: Number(row.quantitySold),
        totalRevenue: Number(row.totalRevenue),
      };
    });

    // Insert ke database
    await prisma.weeklySales.createMany({
      data: dataToInsert,
      skipDuplicates: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: `Berhasil mengimport ${dataToInsert.length} data weekly sales`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to import data",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
