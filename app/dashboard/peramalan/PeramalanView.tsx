"use client";

import SearchBar from "@/components/SearchBar";
import dynamic from "next/dynamic";
import { headersBoldStyle } from "@/components/datatable/headersBoldStyle";
import { useState } from "react";
import { peramalanColumn } from "@/column/dashboard/peramalan";
import { peramalanDummyData } from "@/data/peramalan";

const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

export default function PeramalanView() {
  const [search, setSearch] = useState<string>("");

  const filteredData = peramalanDummyData.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="table-wrapper p-4 mt-7 bg-white flex flex-col border border-gray-200 rounded-3xl">
      <div className="flex justify-end mb-4">
        <SearchBar
          placeholder="Cara nama obat..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <DataTable
        columns={peramalanColumn}
        data={filteredData}
        responsive
        pagination
        highlightOnHover
        customStyles={headersBoldStyle}
      />
    </div>
  );
}
