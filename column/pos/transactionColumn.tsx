import { formatTanggal } from "@/utils/date";
import { formatRupiah } from "@/utils/formatCurrency";
import Link from "next/link";

export const transactionColumn = (handleDelete: (id: string) => void) => [
  {
    name: "ID Transaksi",
    selector: (row: any) => row.id,
  },
  {
    name: "Tanggal Transaksi",
    selector: (row: any) => formatTanggal(row.createdAt),
  },
  {
    name: "Total Harga",
    selector: (row: any) => formatRupiah(Number(row.totalAmount)),
  },
  {
    name: "Nama Kasir",
    selector: (row: any) => row.cashier.name,
  },
  {
    name: "Aksi",
    cell: (row: any) => (
      <div className="flex flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-0">
        <Link
          href={`/pos/history/${row.id}`}
          className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg"
          style={{ background: "#155DFC" }}
        >
          Detail
        </Link>
        <button
          className="bg-red-500 text-white text-xs px-3 py-2 rounded-lg"
          onClick={() => handleDelete(row.id)}
        >
          Hapus
        </button>
      </div>
    ),
  },
];

export const itemSummaryColumn = [
  {
    name: "Nama Item",
    selector: (row: any) => row.medicine.name,
  },
  { name: "Jumlah", selector: (row: any) => row.quantity, sortable: true },
  {
    name: "Harga",
    selector: (row: any) => formatRupiah(row.unitPrice),
  },
  {
    name: "Total Harga",
    selector: (row: any) => formatRupiah(row.subtotal),
  },
];
