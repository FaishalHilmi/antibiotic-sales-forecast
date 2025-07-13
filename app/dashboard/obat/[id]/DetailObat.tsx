"use client";

import ObatCard from "./ObatCard";
import { dummyObatDetail } from "@/data/obat";
import RiwayatStok from "./RiwayatStok";
import { useState } from "react";
import ModalTambahStok from "./ModalTambahStok";

export default function DetailObat() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [riwayatStok, setRiwayatStok] = useState([
    { id: 1, jumlah: 50, keterangan: "Stok awal masuk" },
    { id: 2, jumlah: 30, keterangan: "Restok bulan Juli" },
  ]);

  const handleTambahStok = (jumlah: number, keterangan: string) => {
    const newRiwayat = {
      id: riwayatStok.length + 1,
      jumlah,
      keterangan,
    };

    setRiwayatStok([newRiwayat, ...riwayatStok]);
    setShowModal(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Detail Obat */}
      <div className="col-span-1 md:col-span-2">
        <ObatCard obat={dummyObatDetail} />
      </div>
      {/* Riwayat Stok */}
      <div className="col-span-1">
        <RiwayatStok
          riwayatStok={riwayatStok}
          setShowModaTambah={() => setShowModal(true)}
        />
      </div>
      <ModalTambahStok
        isOpen={showModal}
        onCloseAction={() => setShowModal(false)}
        onSubmitAction={handleTambahStok}
      />
    </div>
  );
}
