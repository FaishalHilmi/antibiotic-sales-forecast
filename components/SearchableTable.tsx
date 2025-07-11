"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
import { TableProps } from "@/types/table";

const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});
export default function SearchableTable<T>({
  column,
  data,
  searchKeys,
  placeholder = "Cari...",
}: TableProps<T>) {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((item) =>
    searchKeys.some((key) =>
      String(item[key]).toLowerCase().includes(search.toLowerCase())
    )
  );

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "700", // Bold
        fontSize: "14px", // Ukuran font
      },
    },
  };

  return (
    <>
      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className=""
      />
      <DataTable
        columns={column}
        data={filteredData}
        pagination
        highlightOnHover
        responsive
        customStyles={customStyles}
      />
    </>
  );
}
