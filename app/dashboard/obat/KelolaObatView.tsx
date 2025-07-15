"use client";

import SearchBar from "@/components/SearchBar";
import dynamic from "next/dynamic";
import { useState } from "react";
import { dummyObat } from "@/data/obat";
import { medicineColumn } from "@/column/dashboard/medicineColumn";

// Import DataTable secara dinamis (SSR disabled)
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

export default function KelolaObatView() {
  const [search, setSearch] = useState<string>("");

  const filteredData = dummyObat.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "700",
        fontSize: "14px",
      },
    },
  };

  //   const medicineColumn = [
  //     {
  //       name: "Nama Obat",
  //       selector: (row: any) => row.name,
  //     },
  //     {
  //       name: "Harga",
  //       selector: (row: any) =>
  //         new Intl.NumberFormat("id-ID", {
  //           style: "currency",
  //           currency: "IDR",
  //           minimumFractionDigits: 0,
  //         }).format(row.price),
  //     },
  //     {
  //       name: "Stok",
  //       selector: (row: any) => row.stocks,
  //     },
  //     {
  //       name: "Kategori",
  //       selector: (row: any) => row.category,
  //     },
  //     {
  //       name: "Aksi",
  //       cell: (row: any) => (
  //         <div className="flex flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-0">
  //           <Link
  //             href={`/dashboard/obat/edit/${row.id}`}
  //             className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg"
  //           >
  //             Detail
  //           </Link>
  //           <Link
  //             href={`/dashboard/obat/delete/${row.id}`}
  //             className="bg-red-500 text-white text-xs px-3 py-2 rounded-lg"
  //           >
  //             Hapus
  //           </Link>
  //         </div>
  //       ),
  //     },
  //   ];

  return (
    <div className="table-wrapper p-4 mt-7 bg-white flex flex-col items-end border border-gray-200 rounded-3xl">
      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari nama obat..."
        className=""
      />
      <DataTable
        columns={medicineColumn}
        data={filteredData}
        pagination
        highlightOnHover
        responsive
        customStyles={customStyles}
      />
    </div>
  );
}
