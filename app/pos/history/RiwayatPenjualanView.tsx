"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { transactionColumn } from "@/column/pos/transactionColumn";
import SearchBar from "@/components/SearchBar";
import { headersBoldStyle } from "@/components/datatable/headersBoldStyle";
import Modal from "@/components/Modal";
import toast from "react-hot-toast";

// Import DataTable secara dinamis (SSR disabled)
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

export default function RiwayatPenjualanView({ transactions }: any) {
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/transaction/${selectedId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Transaksi berhasil dihapus.");
        // Hapus transaksi dari state lokal (atau refetch data)
        transactions = transactions.filter((t: any) => t.id !== selectedId);
      } else {
        toast.error(`Gagal menghapus transaksi: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat menghapus transaksi.");
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
      setSelectedId(null);
    }
  };

  const filteredData = transactions.filter(
    (item: any) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.cashier.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="table-wrapper p-4 mt-7 bg-white flex flex-col border border-gray-200 rounded-3xl">
      <div className="flex justify-between">
        <div />
        <SearchBar
          placeholder="Cari ID atau Nama Kasir..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <DataTable
        columns={transactionColumn(handleDelete)}
        data={filteredData}
        pagination
        highlightOnHover
        responsive
        customStyles={headersBoldStyle}
      />

      {/* MODAL KONFIRMASI */}
      <Modal
        isOpen={isModalOpen}
        onCloseAction={() => {
          if (!isDeleting) {
            setIsModalOpen(false);
            setSelectedId(null);
          }
        }}
        title="Konfirmasi Penghapusan"
      >
        <p className="text-center mb-4">
          Apakah Anda yakin ingin menghapus data transaksi ini?
        </p>

        <div className="flex justify-center gap-4">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            onClick={() => {
              setIsModalOpen(false);
              setSelectedId(null);
            }}
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
