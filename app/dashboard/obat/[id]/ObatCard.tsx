import { MedicineWithImage } from "@/types/medicine";
import React from "react";

export default function ObatCard({ obat }: { obat: MedicineWithImage }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Gambar */}
        <div className="md:col-span-1">
          <img
            src={obat.image}
            alt={obat.name}
            className="w-full h-auto max-h-56 object-cover rounded-2xl border"
          />
        </div>

        {/* Info */}
        <div className="md:col-span-2 flex flex-col justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {obat.name}
            </h3>
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span className="font-medium w-24">Kategori</span>:
                <span>{obat.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium w-24">Harga</span>:
                <span className="text-green-600 font-semibold">
                  Rp {obat.price.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium w-24">Stok</span>:
                <span className="text-blue-600 font-semibold">
                  {obat.stocks} unit
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
