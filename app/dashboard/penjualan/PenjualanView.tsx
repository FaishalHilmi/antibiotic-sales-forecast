"use client";

import SearchBar from "@/components/SearchBar";
import { transactionColumn } from "@/column/dashboard/transactionColumn";
import { transactions } from "@/data/transaction";
import { useState } from "react";
import dynamic from "next/dynamic";

const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

export default function PenjualanView() {
  const [search, setSearch] = useState("");

  const filteredDataById = transactions.filter((item) =>
    item.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-end ">
        <SearchBar
          placeholder="Cari ID obat..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <DataTable
        columns={transactionColumn}
        data={filteredDataById}
        responsive
        pagination
        highlightOnHover
      />
    </div>
  );
}
