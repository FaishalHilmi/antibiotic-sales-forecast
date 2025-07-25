import Link from "next/link";

export const CashierManageColoumn = [
  {
    name: "No",
    selector: (row: any) => row.id,
  },
  {
    name: "Nama",
    selector: (row: any) => row.name,
  },
  {
    name: "Role",
    selector: (row: any) => row.name,
  },
  {
    name: "Aksi",
    cell: (row: any) => (
      <div className="flex flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-0">
        <Link
          href={`/dashboard/kelola-kasir/${row.id}`}
          className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg"
        >
          Detail
        </Link>
        <Link
          href={`/dashboard/kelola-kasir/delete/${row.id}`}
          className="bg-red-500 text-white text-xs px-3 py-2 rounded-lg"
        >
          Hapus
        </Link>
      </div>
    ),
  },
];