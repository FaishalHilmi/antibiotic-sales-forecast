"use client";

import { formatTanggal } from "@/utils/date";
import Link from "next/link";

export const forecastColumn = [
  {
    name: "No",
    selector: (_row: any, index: any) => index + 1,
  },
  {
    name: "Nama Obat",
    selector: (row: any) => row.name,
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
          href={`/dashboard/peramalan/${row.id}`}
          className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg"
          style={{ background: "#155DFC" }}
        >
          Detail
        </Link>
      </div>
    ),
  },
];

export const historyForecastColumn = [
  {
    name: "No",
    selector: (_row: any, index: any) => index + 1,
  },
  {
    name: "Tanggal Peramalan",
    selector: (row: any) => formatTanggal(new Date(row.forecastDate)),
  },
  {
    name: "Periode Peramalan",
    selector: (row: any) => row.period,
  },
  {
    name: "Aksi",
    cell: (row: any) => (
      <div className="flex flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-0">
        <Link
          href={`/dashboard/peramalan/${row.medicineId}/detail/${row.id}`}
          className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg"
          style={{ background: "#155DFC" }}
        >
          Detail
        </Link>
      </div>
    ),
  },
];

export const detailRiwayatPeramalanColumn = [
  { name: "Periode", selector: (row: any) => row.periodLabel },
  {
    name: "Aktual",
    selector: (row: any) =>
      row.actualValue !== null ? `${row.actualValue}` : "-",
  },
  {
    name: "Peramalan",
    selector: (row: any) =>
      row.forecastValue !== null ? `${row.forecastValue}` : "-",
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
