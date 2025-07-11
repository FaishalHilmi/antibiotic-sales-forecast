"use client";
import { useState } from "react";
import Modal from "@/components/Modal";

export default function DetailObatPage() {
  const obat = {
    nama: "Paracetamol",
    kategori: "Antipiretik",
    harga: 8500,
    stok: 120,
    gambar: "/medicine.png",
  };

  const [riwayatStok, setRiwayatStok] = useState([
    { id: 1, jumlah: 50, keterangan: "Stok awal masuk" },
    { id: 2, jumlah: 30, keterangan: "Restok bulan Juli" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [jumlahTambah, setJumlahTambah] = useState<number | "">("");
  const [keterangan, setKeterangan] = useState("");

  const handleSubmitTambahStok = (e: React.FormEvent) => {
    e.preventDefault();

    if (!jumlahTambah || !keterangan) return;

    const newRiwayat = {
      id: riwayatStok.length + 1,
      jumlah: Number(jumlahTambah),
      keterangan,
    };

    setRiwayatStok([newRiwayat, ...riwayatStok]);
    setJumlahTambah("");
    setKeterangan("");
    setShowModal(false);
  };

  return (
    <div className="wrapper">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-1">Detail Obat</h2>
      <p className="text-primary mb-6">Lihat informasi lengkap mengenai obat</p>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Detail Obat */}
        <div className="col-span-1 md:col-span-2">
          <div className="bg-white p-6 rounded-3xl border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {/* Gambar */}
              <div className="md:col-span-1">
                <img
                  src={obat.gambar}
                  alt={obat.nama}
                  className="w-full h-auto max-h-56 object-cover rounded-2xl border"
                />
              </div>

              {/* Info */}
              <div className="md:col-span-2 flex flex-col justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {obat.nama}
                  </h3>
                  <div className="flex flex-col gap-2 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="font-medium w-24">Kategori</span>:
                      <span>{obat.kategori}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium w-24">Harga</span>:
                      <span className="text-green-600 font-semibold">
                        Rp {obat.harga.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium w-24">Stok</span>:
                      <span className="text-blue-600 font-semibold">
                        {obat.stok} unit
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Riwayat Stok */}
        <div className="col-span-1">
          <div className="bg-white p-4 rounded-3xl border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Riwayat Stok</h3>
              <button
                onClick={() => setShowModal(true)}
                className="bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded-lg text-sm transition"
              >
                + Tambah Stok
              </button>
            </div>

            <div className="space-y-3">
              {riwayatStok.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Belum ada riwayat penambahan stok.
                </p>
              ) : (
                riwayatStok.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 p-3 rounded-lg border text-sm"
                  >
                    <div className="font-medium text-green-600">
                      +{item.jumlah} unit
                    </div>
                    <div className="text-gray-500">{item.keterangan}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Tambah Stok */}
      <Modal
        isOpen={showModal}
        onCloseAction={() => setShowModal(false)}
        title="Tambah Stok"
      >
        <form onSubmit={handleSubmitTambahStok} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="jumlah">Jumlah Stok</label>
            <input
              id="jumlah"
              type="number"
              value={jumlahTambah}
              onChange={(e) => setJumlahTambah(Number(e.target.value))}
              className="border border-gray-300 rounded-lg py-1.5 px-3 outline-primary"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="keterangan">Keterangan</label>
            <input
              id="keterangan"
              type="text"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              className="border border-gray-300 rounded-lg py-1.5 px-3 outline-primary"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            {/* <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-sm rounded-lg border"
            >
              Batal
            </button> */}
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-lg bg-primary text-white"
            >
              Simpan
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
