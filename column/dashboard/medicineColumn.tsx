"use client";

import Link from "next/link";

export const medicineColumn = [
  {
    name: <span className="font-bold text-black">Nama Obat</span>,
    selector: (row: any) => row.name,
    sortable: true,
  },
  {
    name: <span className="font-bold text-black">Harga</span>,
    selector: (row: any) => `Rp ${row.price.toLocaleString()}`,
    sortable: true,
  },
  {
    name: <span className="font-bold text-black">Stok</span>,
    selector: (row: any) => row.stocks,
    sortable: true,
  },
  {
    name: <span className="font-bold text-black">Kategori</span>,
    selector: (row: any) => row.category,
    sortable: true,
  },
  {
    name: <span className="font-bold text-black">Aksi</span>,
    cell: (row: any) => (
      <div className="flex flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-0">
        <Link
          href={`/history/${row.id}`}
          className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg"
        >
          Detail
        </Link>
        <Link
          href={`/history/delete/${row.id}`}
          className="bg-red-500 text-white text-xs px-3 py-2 rounded-lg"
        >
          Hapus
        </Link>
      </div>
    ),
  },
];
