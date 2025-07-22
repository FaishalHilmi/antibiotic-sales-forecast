"use client";

import { riwayatPeramalanColumn } from "@/column/dashboard/peramalan";
import { headersBoldStyle } from "@/components/datatable/headersBoldStyle";
import SearchBar from "@/components/SearchBar";
import dynamic from "next/dynamic";
import { useState } from "react";

const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

export default function RiwayatPeramalan({
  riwayatPeramalan,
}: {
  riwayatPeramalan: {
    id: number;
    tanggalPeramalan: string;
    periodePeramalan: string;
  }[];
}) {
  const [search, setSearch] = useState<string>("");

  const filteredData = riwayatPeramalan.filter((item) => {
    const tanggalFormatted = new Date(item.tanggalPeramalan).toLocaleDateString(
      "id-ID",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

    return tanggalFormatted.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="table-wrapper p-4 mt-3 bg-white flex flex-col border border-gray-200 rounded-3xl">
      <h2 className="text-xl font-semibold mb-4">Riwayat Peramalan</h2>
      <div className="flex justify-end mb-4">
        <SearchBar
          placeholder="Cara tangggal peramalan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <DataTable
        columns={riwayatPeramalanColumn}
        data={filteredData}
        responsive
        pagination
        highlightOnHover
        customStyles={headersBoldStyle}
      />
    </div>
  );
}
