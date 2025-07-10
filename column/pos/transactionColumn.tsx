import Link from "next/link";

export const transactionColumns = [
  {
    name: <span className="font-bold text-black">ID Transaksi</span>,
    selector: (row: any) => row.id,
    sortable: true,
  },
  {
    name: <span className="font-bold text-black">Tanggal Transaksi</span>,
    selector: (row: any) => row.date,
    sortable: true,
  },
  {
    name: <span className="font-bold text-black">Total Harga</span>,
    selector: (row: any) => `Rp ${row.total.toLocaleString()}`,
    sortable: true,
  },
  {
    name: <span className="font-bold text-black">Nama Kasir</span>,
    selector: (row: any) => row.cashier,
    sortable: true,
  },
  {
    name: <span className="font-bold text-black">Aksi</span>,
    cell: (row: any) => (
      <div className="flex flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-0">
        <Link
          href={`/history/${row.transactionId}`}
          className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg"
        >
          Detail
        </Link>
        <Link
          href={`/history/delete/${row.transactionId}`}
          className="bg-red-500 text-white text-xs px-3 py-2 rounded-lg"
        >
          Hapus
        </Link>
      </div>
    ),
  },
];
