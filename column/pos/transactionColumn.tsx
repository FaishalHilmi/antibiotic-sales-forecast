import Link from "next/link";

export const transactionColumn = (handleDelete: (id: string) => void) => [
  {
    name: "ID Transaksi",
    selector: (row: any) => row.id,
  },
  {
    name: "Tanggal Transaksi",
    selector: (row: any) =>
      new Intl.DateTimeFormat("id-ID", {
        dateStyle: "full",
      }).format(new Date(row.createdAt)),
  },
  {
    name: "Total Harga",
    selector: (row: any) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(row.totalAmount),
  },
  {
    name: "Nama Kasir",
    selector: (row: any) => row.cashier.name,
  },
  {
    name: "Aksi",
    cell: (row: any) => (
      <div className="flex gap-2">
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
