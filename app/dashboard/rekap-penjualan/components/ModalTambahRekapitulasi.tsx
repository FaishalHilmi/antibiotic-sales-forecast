"use client";

import Modal from "@/components/Modal";
import { ModalTambahRekapitulasiProps } from "@/types/modal";
import { useState } from "react";

export default function ModalTambahRekapitulasi({
  isOpen,
  onCloseAction,
  onSubmitAction,
}: ModalTambahRekapitulasiProps) {
  const [periode, setPeriode] = useState<string>("");

  const handleSubmitRekapitulasi = (e: React.FormEvent) => {
    e.preventDefault();

    if (!periode) return;
    onSubmitAction(periode);
    setPeriode("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onCloseAction={onCloseAction}
      title="Tambah Rekapitulasi"
    >
      <form onSubmit={handleSubmitRekapitulasi} className="space-y-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="periode">Periode</label>
          <input
            id="periode"
            name="periode"
            type="date"
            value={periode}
            onChange={(e) => setPeriode(e.target.value)}
            className="border border-gray-300 rounded-lg py-1.5 px-3 outline-primary"
            required
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="submit"
            className="px-4 py-2 text-sm rounded-lg bg-primary text-white"
          >
            Buat Rekap
          </button>
        </div>
      </form>
    </Modal>
  );
}
