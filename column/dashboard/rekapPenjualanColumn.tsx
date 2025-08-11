"use client";

import { formatRupiah } from "@/utils/formatCurrency";
import Link from "next/link";

export const salesRecapColumn = (
  handleUpdateSalesRecap: (id: string) => void
) => [
  {
    name: "No",
    width: "60px",
    selector: (_row: any, index: any) => index + 1,
  },
  {
    name: "Periode",
    selector: (row: any) => row.period,
  },
  {
    name: "Total Penjualan",
    selector: (row: any) => formatRupiah(row.grossRevenue),
  },
  {
    name: "Total Obat Terjual",
    selector: (row: any) => row.totalSoldQuantity,
  },
  {
    name: "Aksi",
    cell: (row: any) => (
      <div className="flex flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-0">
        <Link
          href={`/dashboard/rekap-penjualan/${row.id}`}
          className="bg-blue-600 text-white text-xs text-center px-3 py-2 rounded-lg"
          style={{ background: "#155DFC" }}
        >
          Detail
        </Link>
        <button
          onClick={() => handleUpdateSalesRecap(row.id)}
          className="bg-yellow-500 text-white text-xs text-center px-3 py-2 rounded-lg"
          style={{ background: "#F0B100" }}
        >
          Update
        </button>
      </div>
    ),
  },
];

export const rekapPenjualanObatColumn = [
  {
    name: "No",
    cell: (_: any, index: number) => index + 1,
    width: "60px",
  },
  {
    name: "Nama Obat",
    selector: (row: any) => row.medicine.name,
  },
  {
    name: "Jumlah Terjual",
    selector: (row: any) => `${row.quantitySold} ${row.medicine.unit}`,
  },
  {
    name: "Harga Satuan",
    selector: (row: any) => formatRupiah(Number(row.unitPrice)),
  },
  {
    name: "Total Penjualan",
    selector: (row: any) => formatRupiah(Number(row.totalRevenue)),
  },
];
