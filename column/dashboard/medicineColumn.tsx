"use client";

import Link from "next/link";

export const medicineColumn = [
  {
    name: "Nama Obat",
    selector: (row: any) => row.name,
  },
  {
    name: "Harga",
    selector: (row: any) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(row.price),
  },
  {
    name: "Stok",
    selector: (row: any) => row.stocks,
  },
  {
    name: "Kategori",
    selector: (row: any) => row.category,
  },
  {
    name: "Aksi",
    cell: (row: any) => (
      <div className="flex flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-0">
        <Link
          href={`/dashboard/obat/${row.id}`}
          className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg"
        >
          Detail
        </Link>
        <Link
          href={`/dashboard/obat/delete/${row.id}`}
          className="bg-red-500 text-white text-xs px-3 py-2 rounded-lg"
        >
          Hapus
        </Link>
      </div>
    ),
  },
];
