"use client";

import { rekapPenjualanColumn } from "@/column/dashboard/rekapPenjualanColumn";
import { useState } from "react";
import { headersBoldStyle } from "@/components/datatable/headersBoldStyle";
import { dummyRekapPenjualan } from "@/data/penjualan";
import SearchBar from "@/components/SearchBar";
import ModalTambahRekapitulasi from "./components/ModalTambahRekapitulasi";
import dynamic from "next/dynamic";

const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

export default function RekapPenjualanView() {
  const [search, setSearch] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [rekapData, setRekapData] = useState<any[]>(dummyRekapPenjualan);

  const formatPeriode = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
      date
    );
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  const filteredDataByPeriode = rekapData.filter((item) =>
    item.periode.toLowerCase().includes(search.toLowerCase())
  );

  const handleTambahRekapitulasi = (periode: string) => {
    const newRekapitulasi = {
      id: dummyRekapPenjualan.length + 1,
      periode: formatPeriode(periode),
      totalPenjualan: 0,
      totalObatTerjual: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setRekapData([newRekapitulasi, ...rekapData]);
    setShowModal(false);
  };

  return (
    <div className="table-wrapper p-4 mt-7 bg-white flex flex-col border border-gray-200 rounded-3xl">
      <div className="mb-4 flex flex-col md:flex-row justify-between">
        <button
          className="py-2 px-3.5 mb-3 md:mb-0 rounded-lg text-sm bg-primary text-white shadow-md w-fit"
          onClick={() => setShowModal(true)}
        >
          Tambah Rekapitulasi
        </button>
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari periode rekapitulasi..."
        />
      </div>
      <DataTable
        columns={rekapPenjualanColumn}
        data={filteredDataByPeriode}
        responsive
        pagination
        highlightOnHover
        customStyles={headersBoldStyle}
      />
      <ModalTambahRekapitulasi
        isOpen={showModal}
        onCloseAction={() => setShowModal(false)}
        onSubmitAction={handleTambahRekapitulasi}
      />
    </div>
  );
}
