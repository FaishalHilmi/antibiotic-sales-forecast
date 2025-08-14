"use client";

import { salesRecapColumn } from "@/column/dashboard/rekapPenjualanColumn";
import { useState } from "react";
import { headersBoldStyle } from "@/components/datatable/headersBoldStyle";
import SearchBar from "@/components/SearchBar";
import ModalTambahRekapitulasi from "./components/ModalTambahRekapitulasi";
import dynamic from "next/dynamic";
import { SalesRecap } from "@/types/sales";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";

const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

export default function RekapPenjualanView({
  salesRecap,
}: {
  salesRecap: SalesRecap[];
}) {
  const [search, setSearch] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [recapData, setRecapData] = useState<SalesRecap[]>(salesRecap);
  const [saleRecapId, setSaleRecapId] = useState<string | null>();
  const router = useRouter();

  const recapDataWithPeriod = recapData.map((item) => {
    const date = new Date(item.year, item.month - 1); // -1 karena bulan mulai dari 0
    const monthName = format(date, "MMMM", { locale: id });
    return {
      ...item,
      period: `${monthName} ${item.year}`,
    };
  });

  const filteredDataByPeriode = recapDataWithPeriod.filter((item) => {
    if (!search.trim()) return true;

    const searchLower = search.toLowerCase();
    return (
      item.period.toLowerCase().includes(searchLower) ||
      item.year.toString().includes(searchLower)
    );
  });

  const handleUpdateSalesRecap = async (salesRecapId: string) => {
    try {
      const res = await fetch(`/api/sales-recap/${salesRecapId}`, {
        method: "PUT",
        credentials: "include",
      });
      const req = await res.json();
      if (!res.ok) {
        toast.error(req.message);
      }
      toast.success(req.message);
    } catch (error) {
      toast.error("Gagal update rekapitulasi penjualan");
    }
  };

  const handleAddSalesRecap = async (period: string) => {
    try {
      const formData = new FormData();
      formData.append("period", period);

      const res = await fetch("/api/sales-recap", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const req = await res.json();

      if (!res.ok) {
        toast.error(req.message || "Gagal menambahkan rekapitulasi penjualan");
        return;
      }

      const saleRecapId = req.payload.id.id;

      setSaleRecapId(saleRecapId);
      setIsModalOpen(true);

      toast.success(
        req.message || "Berhasil menambahkan rekapitulasi penjualan"
      );
      setShowModal(false);
    } catch (error) {
      toast.error("Gagal menambahkan rekapitulasi penjualan");
    }
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
        columns={salesRecapColumn(handleUpdateSalesRecap)}
        data={filteredDataByPeriode}
        responsive
        pagination
        highlightOnHover
        customStyles={headersBoldStyle}
      />
      <ModalTambahRekapitulasi
        isOpen={showModal}
        onCloseAction={() => setShowModal(false)}
        onSubmitAction={handleAddSalesRecap}
      />

      {/* Modal setelah forecasting berhasil */}
      <Modal
        isOpen={isModalOpen}
        onCloseAction={() => setIsModalOpen(false)}
        title="Ingin melihat hasil rekapitulasi penjualan?"
      >
        <div className="flex flex-col gap-4 items-center">
          <p className="text-center">
            Rekapitulasi penjualan berhasil dibuat. Klik tombol di bawah untuk
            melihat hasilnya.
          </p>
          <button
            onClick={() => {
              setIsModalOpen(false);
              if (saleRecapId) {
                router.push(`/dashboard/rekap-penjualan/${saleRecapId}`);
              }
            }}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            Lihat
          </button>
        </div>
      </Modal>
    </div>
  );
}
