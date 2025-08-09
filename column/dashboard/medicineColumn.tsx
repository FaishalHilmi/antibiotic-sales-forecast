"use client";

import { formatRupiah } from "@/utils/formatCurrency";
import Link from "next/link";

export const medicineColumn = (handleDelete: (id: string) => void) => [
  {
    name: "Nama Obat",
    selector: (row: any) => row.name,
  },
  {
    name: "Harga",
    selector: (row: any) => formatRupiah(row.price),
  },
  {
    name: "Stok",
    selector: (row: any) => row.stock,
  },
  {
    name: "Kategori",
    selector: (row: any) =>
      row.category.charAt(0).toUpperCase() + row.category.slice(1),
  },
  {
    name: "Aksi",
    cell: (row: any) => (
      <div className="flex flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-0">
        <Link
          href={`/dashboard/obat/${row.id}`}
          className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg"
          style={{ background: "#155DFC" }}
        >
          Detail
        </Link>
        <button
          onClick={() => handleDelete(row.id)}
          className="bg-red-500 text-white text-xs px-3 py-2 rounded-lg"
        >
          Hapus
        </button>
      </div>
    ),
  },
];
