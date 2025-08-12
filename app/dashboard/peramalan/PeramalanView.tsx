"use client";

import SearchBar from "@/components/SearchBar";
import dynamic from "next/dynamic";
import { headersBoldStyle } from "@/components/datatable/headersBoldStyle";
import { useState } from "react";
import { forecastColumn } from "@/column/dashboard/peramalan";
import { ForecastMedicines } from "@/types/forecasting";

const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

export default function PeramalanView({
  forecastMedicines,
}: {
  forecastMedicines: ForecastMedicines[];
}) {
  const [search, setSearch] = useState<string>("");
  const [medicines, setMedicines] =
    useState<ForecastMedicines[]>(forecastMedicines);

  const filteredMedicinesData = medicines.filter((item) => {
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
        columns={forecastColumn}
        data={filteredMedicinesData}
        responsive
        pagination
        highlightOnHover
        customStyles={headersBoldStyle}
      />
    </div>
  );
}
