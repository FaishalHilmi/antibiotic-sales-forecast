"use client";

import Link from "next/link";

export const peramalanColumn = [
  {
    name: "No",
    selector: (row: any) => row.id,
  },
  {
    name: "Nama Obat",
    selector: (row: any) => row.name,
  },
  {
    name: "Kategori",
    selector: (row: any) => row.category,
  },
  //   {
  //     name: "Jumlah Terjua",
  //     selector: (row: any) => row.stocks,
  //   },
  {
    name: "Aksi",
    cell: (row: any) => (
      <div className="flex flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-0">
        <Link
          href={`/dashboard/peramalan/${row.id}`}
          className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg"
        >
          Detail
        </Link>
      </div>
    ),
  },
];

export const riwayatPeramalanColumn = [
  {
    name: "No",
    selector: (row: any) => row.id,
  },
  {
    name: "Tanggal Peramalan",
    selector: (row: any) =>
      new Date(row.tanggalPeramalan).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
  },
  {
    name: "Periode Peramalan",
    selector: (row: any) => row.periodePeramalan,
  },
  {
    name: "Aksi",
    cell: (row: any) => (
      <div className="flex flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-0">
        <Link
          href={`/dashboard/peramalan/${row.id}/detail/${row.id}`}
          className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg"
        >
          Detail
        </Link>
      </div>
    ),
  },
];

export const detailRiwayatPeramalanColumn = [
  { name: "Periode", selector: (row: any) => row.periode },
  { name: "Aktual", selector: (row: any) => row.aktual },
  {
    name: "Peramalan",
    selector: (row: any) => (row.peramalan !== null ? `${row.peramalan}` : "-"),
  },
  {
    name: "MAPE",
    selector: (row: any) => (row.mape !== null ? `${row.mape}%` : "-"),
  },
  {
    name: "MAE",
    selector: (row: any) => (row.mae !== null ? `${row.mae}` : "-"),
  },
];
