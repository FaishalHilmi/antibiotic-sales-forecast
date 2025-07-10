"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { transactions } from "@/data/transaction";
import { transactionColumn } from "@/column/pos/transactionColumn";

// Import DataTable secara dinamis (SSR disabled)
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

export default function History() {
  const [search, setSearch] = useState("");

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "700", // Bold
        fontSize: "14px", // Ukuran font
      },
    },
  };

  const filteredData = transactions.filter(
    (item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.cashier.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="wrapper">
        <h1 className="font-bold text-lg md:text-3xl mb-1">
          Riwayat Transaksi
        </h1>
        <span className="block text-primary">
          Catatan lengkap dari penjualan yang telah diselesaikan
        </span>
        <div className="table-wrapper p-4 mt-7 bg-white flex flex-col items-end border border-gray-200 rounded-3xl">
          <input
            type="text"
            placeholder="Cari ID atau Nama Kasir..."
            className="border border-gray-200 rounded-xl px-3 py-2 mb-4 text-sm outline-gray-300"
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
      </div>
    </div>
  );
}
