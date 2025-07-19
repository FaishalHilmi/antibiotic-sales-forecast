"use client";

import Link from "next/link";

export const rekapPenjualanColumn = [
  {
    name: "No",
    selector: (row: any) => row.id,
  },
  {
    name: "Periode",
    selector: (row: any) => row.periode,
  },
  {
    name: "Total Penjualan",
    selector: (row: any) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(row.totalPenjualan),
  },
  {
    name: "Total Obat Terjual",
    selector: (row: any) => row.totalObatTerjual,
  },
  {
    name: "Aksi",
    cell: (row: any) => (
      <div className="flex flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-0">
        <Link
          href={`/dashboard/rekap-penjualan/${row.id}`}
          className="bg-blue-600 text-white text-xs text-center px-3 py-2 rounded-lg"
        >
          Detail
        </Link>
        <Link
          href={`dashboard/rekap-penjualan/update/${row.id}`}
          className="bg-yellow-500 text-white text-xs text-center px-3 py-2 rounded-lg"
        >
          Update
        </Link>
      </div>
    ),
  },
];

export const rekapPengeluanColumn = [
  { name: "Nama Obat", selector: (row: any) => row.nama },
  { name: "Minggu 4", selector: (row: any) => row.minggu_4 },
  { name: "Minggu 3", selector: (row: any) => row.minggu_3 },
  { name: "Minggu 2", selector: (row: any) => row.minggu_2 },
  { name: "Minggu 1", selector: (row: any) => row.minggu_1 },
  { name: "Total", selector: (row: any) => row.total },
];

export const rekapPenjualanObatColumn = [
  {
    name: "No",
    cell: (_: any, index: number) => index + 1,
    width: "60px",
  },
  {
    name: "Nama Obat",
    selector: (row: any) => row.nama,
    sortable: true,
  },
  {
    name: "Jumlah Terjual",
    selector: (row: any) => `${row.jumlah} strip`,
    sortable: true,
  },
  {
    name: "Harga Satuan",
    selector: (row: any) =>
      `Rp ${(row.total / row.jumlah).toLocaleString("id-ID")}`,
    sortable: false,
  },
  {
    name: "Total Penjualan",
    selector: (row: any) => `Rp ${row.total.toLocaleString("id-ID")}`,
    sortable: true,
  },
];

export const rekapPeramalanColumn = [
  { name: "Nama Obat", selector: (row: any) => row.nama },
  { name: "Minggu 1", selector: (row: any) => row.minggu_1 },
  { name: "Minggu 2", selector: (row: any) => row.minggu_2 },
  { name: "Minggu 3", selector: (row: any) => row.minggu_3 },
  { name: "Minggu 4", selector: (row: any) => row.minggu_4 },
  { name: "Total", selector: (row: any) => row.total },
];
