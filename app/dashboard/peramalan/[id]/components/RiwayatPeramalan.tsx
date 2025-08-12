"use client";

import { historyForecastColumn } from "@/column/dashboard/peramalan";
import { headersBoldStyle } from "@/components/datatable/headersBoldStyle";
import { formatTanggal } from "@/utils/date";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import dynamic from "next/dynamic";

const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

export default function RiwayatPeramalan({
  historyForecast,
}: {
  historyForecast: {
    id: number;
    forecastDate: string;
    period: string;
  }[];
}) {
  const [search, setSearch] = useState<string>("");

  const filteredData = historyForecast.filter((item) => {
    const forecastDate = formatTanggal(new Date(item.forecastDate));

    return forecastDate.toLowerCase().includes(search.toLowerCase());
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
        columns={historyForecastColumn}
        data={filteredData}
        responsive
        pagination
        highlightOnHover
        customStyles={headersBoldStyle}
      />
    </div>
  );
}
