"use client";

import Link from "next/link";

export const transactionColumn = [
  {
    name: "ID Transaksi",
    selector: (row: any) => row.id,
  },
  {
    name: "Tanggal Transaksi",
    selector: (row: any) => row.date,
  },
  {
    name: "Total Harga",
    selector: (row: any) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(row.total),
  },
  {
    name: "Nama Kasir",
    selector: (row: any) => row.cashier,
  },
  {
    name: "Aksi",
    cell: (row: any) => (
      <div className="flex flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-0">
        <Link
          href={`/dashboard/penjualan/${row.id}`}
          className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg"
        >
          Detail
        </Link>
        <Link
          href={`dashboard/penjualan/delete/${row.id}`}
          className="bg-red-500 text-white text-xs px-3 py-2 rounded-lg"
        >
          Hapus
        </Link>
      </div>
    ),
  },
];
