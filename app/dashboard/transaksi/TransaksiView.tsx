"use client";

import SearchBar from "@/components/SearchBar";
import { transactionColumn } from "@/column/dashboard/transactionColumn";
import { useState } from "react";
import dynamic from "next/dynamic";
import { headersBoldStyle } from "@/components/datatable/headersBoldStyle";
import { TransactionsProps } from "@/types/transaction";
import { useDeleteWithConfirm } from "@/hooks/useDeletedConfirm";
import Modal from "@/components/Modal";

const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

export default function TransaksiView({
  transactions,
}: {
  transactions: TransactionsProps[];
}) {
  const [dataTransactions, setDataTransactions] =
    useState<TransactionsProps[]>(transactions);
  const [search, setSearch] = useState("");

  const filteredTransactionById = dataTransactions.filter((item) =>
    item.id.toLowerCase().includes(search.toLowerCase())
  );

  const {
    isModalOpen,
    isDeleting,
    handleDelete,
    handleConfirmDelete,
    setIsModalOpen,
  } = useDeleteWithConfirm({
    endpoint: "/api/transaction",
    onSuccess: (id) =>
      setDataTransactions((prev) => prev.filter((item) => item.id !== id)),
  });

  return (
    <div>
      <div className="flex justify-end mb-4">
        <SearchBar
          placeholder="Cari ID obat..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <DataTable
        columns={transactionColumn(handleDelete)}
        data={filteredTransactionById}
        responsive
        pagination
        highlightOnHover
        customStyles={headersBoldStyle}
      />

      {/* MODAL KONFIRMASI */}
      <Modal
        isOpen={isModalOpen}
        onCloseAction={() => !isDeleting && setIsModalOpen(false)}
        title="Konfirmasi Penghapusan"
      >
        <p className="text-center mb-4">
          Apakah Anda yakin ingin menghapus transaksi ini?
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
