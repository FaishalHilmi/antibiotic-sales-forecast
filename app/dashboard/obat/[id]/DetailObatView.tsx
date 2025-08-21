"use client";

import ObatCard from "./components/ObatCard";
import RiwayatStok from "./components/RiwayatStok";
import ModalTambahStok from "./components/ModalTambahStok";
import { useEffect, useState } from "react";
import { MedicineState } from "@/types/medicine";
import toast from "react-hot-toast";

export default function DetailObatView({ medicineId }: { medicineId: string }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [stockHistory, setStockHistory] = useState([]);
  const [medicineDetail, setMedicineDetail] = useState<MedicineState>();

  const getMedicineDetail = async () => {
    try {
      const res = await fetch(`/api/medicines/${medicineId}`, {
        method: "GET",
      });
      if (!res.ok) throw new Error("Gagal mengambil detail obat");

      const req = await res.json();
      const medicine = req.payload;
      setMedicineDetail(medicine);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getStocskHistory = async () => {
    try {
      const res = await fetch(`/api/medicines/${medicineId}/stock`, {
        method: "GET",
      });

      const req = await res.json();
      const stockHistory = req.payload;
      setStockHistory(stockHistory);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleAddStock = async (
    quantity: number,
    action: string,
    note: string
  ) => {
    try {
      const formData = new FormData();
      formData.append("quantity", quantity.toString());
      formData.append("action", action);
      formData.append("note", note);

      const res = await fetch(`/api/medicines/${medicineId}/stock`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Gagal menambah stok");
      }

      const data = await res.json();
      toast.success(data.message || "Stok berhasil diperbarui");

      await getStocskHistory();
      await getMedicineDetail();
      setShowModal(false);
    } catch (error: any) {
      toast.error(error.message || "Terjadi kesalahan saat menambah stok");
    }
  };

  useEffect(() => {
    getMedicineDetail();
    getStocskHistory();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Detail Obat */}
      <div className="col-span-1 md:col-span-2">
        {medicineDetail ? (
          <ObatCard medicines={medicineDetail} />
        ) : (
          <div className="w-full h-40 rounded-3xl bg-slate-50 border border-gray-200"></div>
        )}
      </div>
      {/* Riwayat Stok */}
      <div className="col-span-1">
        <RiwayatStok
          stockHistory={stockHistory}
          setShowModaTambah={() => setShowModal(true)}
        />
      </div>
      <ModalTambahStok
        isOpen={showModal}
        onCloseAction={() => setShowModal(false)}
        onSubmitAction={handleAddStock}
      />
    </div>
  );
}
