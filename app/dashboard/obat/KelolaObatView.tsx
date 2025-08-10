"use client";

import SearchBar from "@/components/SearchBar";
import dynamic from "next/dynamic";
import { useState } from "react";
import { medicineColumn } from "@/column/dashboard/medicineColumn";
import { headersBoldStyle } from "@/components/datatable/headersBoldStyle";
import Link from "next/link";
import { MedicineState } from "@/types/medicine";
import Modal from "@/components/Modal";
import { useDeleteWithConfirm } from "@/hooks/useDeletedConfirm";

// Import DataTable secara dinamis (SSR disabled)
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

export default function KelolaObatView({
  medicines,
}: {
  medicines: MedicineState[];
}) {
  const [dataMedicines, setDataMedicines] =
    useState<MedicineState[]>(medicines);
  const [search, setSearch] = useState<string>("");

  const {
    isModalOpen,
    isDeleting,
    handleDelete,
    handleConfirmDelete,
    setIsModalOpen,
  } = useDeleteWithConfirm({
    endpoint: "/api/medicines",
    onSuccess: (id) => {
      setDataMedicines((prev) => prev.filter((item) => item.id !== id));
    },
  });

  const filteredDataMedicine = dataMedicines.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="table-wrapper p-4 mt-7 bg-white flex flex-col border border-gray-200 rounded-3xl">
      <div className="mb-4 flex flex-col md:flex-row justify-between">
        <Link
          href={"/dashboard/obat/tambah"}
          className="py-2 px-3.5 mb-3 md:mb-0 rounded-lg text-sm bg-primary text-white shadow-md w-fit"
        >
          Tambah Obat
        </Link>
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama obat..."
          className=""
        />
      </div>
      <DataTable
        columns={medicineColumn(handleDelete)}
        data={filteredDataMedicine}
        pagination
        highlightOnHover
        responsive
        customStyles={headersBoldStyle}
      />

      {/* MODAL KONFIRMASI */}
      <Modal
        isOpen={isModalOpen}
        onCloseAction={() => !isDeleting && setIsModalOpen(false)}
        title="Konfirmasi Penghapusan"
      >
        <p className="text-center mb-4">
          Apakah Anda yakin ingin menghapus obat ini?
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            onClick={() => setIsModalOpen(false)}
            disabled={isDeleting}
          >
            Batal
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50"
            onClick={handleConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Menghapus..." : "Ya, Hapus"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
