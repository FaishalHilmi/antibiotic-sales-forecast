"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { transactions } from "@/data/transaction";
import { transactionColumn } from "@/column/pos/transactionColumn";
import SearchBar from "@/components/SearchBar";

// Import DataTable secara dinamis (SSR disabled)
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});
export default function RiwayatPenjualanView() {
  const [search, setSearch] = useState("");

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "700", // Bold
        fontSize: "14px", 
      },
    },
  };

  const filteredData = transactions.filter(
    (item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.cashier.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="table-wrapper p-4 mt-7 bg-white flex flex-col items-end border border-gray-200 rounded-3xl">
      <SearchBar
        placeholder="Cari ID atau Nama Kasir..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DataTable
        columns={transactionColumn}
        data={filteredData}
        pagination
        highlightOnHover
        responsive
        customStyles={customStyles}
      />
    </div>
  );
}
