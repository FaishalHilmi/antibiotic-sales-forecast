"use client";

import Modal from "@/components/Modal";
import SelectInput from "@/components/SelectInput";
import { actionOptions } from "@/data/kategoriOptionsDummy";
import { ModalTambahStokProps } from "@/types/modal";
import { useState } from "react";

export default function ModalTambahStok({
  isOpen,
  onCloseAction,
  onSubmitAction,
}: ModalTambahStokProps) {
  const [jumlahTambah, setJumlahTambah] = useState<number | "">("");
  const [keterangan, setKeterangan] = useState<string>("");
  const [aksi, setAksi] = useState<string>("");

  const handleSubmitTambahStok = (e: React.FormEvent) => {
    e.preventDefault();

    if (!jumlahTambah || !keterangan) return;
    onSubmitAction(Number(jumlahTambah), aksi, keterangan);
    setJumlahTambah("");
    setAksi("");
    setKeterangan("");
  };

  return (
    <Modal isOpen={isOpen} onCloseAction={onCloseAction} title="Tambah Stok">
      <form onSubmit={handleSubmitTambahStok} className="space-y-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="quantity">Jumlah Stok</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            value={jumlahTambah}
            onChange={(e) => setJumlahTambah(Number(e.target.value))}
            className="border border-gray-300 rounded-lg py-1.5 px-3 outline-primary"
            required
          />
        </div>

        <SelectInput
          label="Aksi"
          id="action"
          options={actionOptions}
          value={aksi}
          onChange={(e) => setAksi(e.target.value)}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="note">Keterangan</label>
          <input
            id="note"
            name="note"
            type="text"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            className="border border-gray-300 rounded-lg py-1.5 px-3 outline-primary"
            placeholder="Tambah stok bulan Juni"
            required
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="submit"
            className="px-4 py-2 text-sm rounded-lg bg-primary text-white"
          >
            Simpan
          </button>
        </div>
      </form>
    </Modal>
  );
}
