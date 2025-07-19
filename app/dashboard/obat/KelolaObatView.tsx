"use client";

import SearchBar from "@/components/SearchBar";
import dynamic from "next/dynamic";
import { useState } from "react";
import { dummyObat } from "@/data/obat";
import { medicineColumn } from "@/column/dashboard/medicineColumn";
import { headersBoldStyle } from "@/components/datatable/headersBoldStyle";
import Link from "next/link";

// Import DataTable secara dinamis (SSR disabled)
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

export default function KelolaObatView() {
  const [search, setSearch] = useState<string>("");

  const filteredData = dummyObat.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="table-wrapper p-4 mt-7 bg-white flex flex-col border border-gray-200 rounded-3xl">
      <div className="mb-4 flex flex-col md:flex-row justify-between">
        <Link
          href={"/dashboard/obat/tambah"}
          className="py-2 px-3.5 mb-3 md:mb-0 rounded-lg text-sm bg-primary text-white shadow-md w-fit"
        >
          Tambah Obat
        </Link>
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama obat..."
          className=""
        />
      </div>
      <DataTable
        columns={medicineColumn}
        data={filteredData}
        pagination
        highlightOnHover
        responsive
        customStyles={headersBoldStyle}
      />
    </div>
  );
}
