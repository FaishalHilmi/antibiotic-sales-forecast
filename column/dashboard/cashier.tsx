import Link from "next/link";

export const CashierManageColoumn = (handleDelete: (id: string) => void) => [
  {
    name: "No",
    selector: (_row: any, index: any) => index + 1,
  },
  {
    name: "Nama",
    selector: (row: any) =>
      row.name.charAt(0).toUpperCase() + row.name.slice(1),
  },
  {
    name: "Role",
    selector: (row: any) =>
      row.role.charAt(0).toUpperCase() + row.role.slice(1),
  },
  {
    name: "Aksi",
    cell: (row: any) => (
      <div className="flex flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-0">
        <Link
          href={`/dashboard/kelola-kasir/${row.id}`}
          className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg"
          style={{ background: "#155DFC" }}
        >
          Detail
        </Link>
        <button
          onClick={() => handleDelete(row.id)}
          className="bg-red-500 text-white text-xs px-3 py-2 rounded-lg"
          style={{ background: "#FB2C36" }}
        >
          Hapus
        </button>
      </div>
    ),
  },
];
