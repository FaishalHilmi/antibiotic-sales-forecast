"use client";

import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import { headersBoldStyle } from "@/components/datatable/headersBoldStyle";
import { dummyDataCashier } from "@/data/kasir";
import { CashierManageColoumn } from "@/column/dashboard/cashier";
// Import DataTable secara dinamis (SSR disabled)
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});



export default function KelolaKasirView() {
  const [search, setSearch] = useState<string>("");

  const filteredData = dummyDataCashier.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="table-wrapper p-4 mt-7 bg-white flex flex-col border border-gray-200 rounded-3xl">
      <div className="mb-4 flex flex-col md:flex-row justify-between">
        <Link
          href={"/dashboard/kelola-kasir/tambah"}
          className="py-2 px-3.5 mb-3 md:mb-0 rounded-lg text-sm bg-primary text-white shadow-md w-fit"
        >
          Tambah Akun Kasir
        </Link>
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama pengguna..."
          className=""
        />
      </div>
      <DataTable
        columns={CashierManageColoumn}
        data={filteredData}
        pagination
        highlightOnHover
        responsive
        customStyles={headersBoldStyle}
      />
    </div>
  );
}
