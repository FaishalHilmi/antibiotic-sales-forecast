import { MedicineProps } from "@/types/medicine";
import { formatRupiah } from "@/utils/formatCurrency";
import Image from "next/image";
import React from "react";

export default function ObatCard({ medicines }: MedicineProps) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Gambar */}
        <div className="md:col-span-1">
          <Image
            src={
              medicines.imagePath == ""
                ? "/blank-image.png"
                : medicines.imagePath
            }
            alt={medicines.name}
            className="w-full h-40 object-cover rounded-2xl border"
            width={500}
            height={200}
          />
        </div>

        {/* Info */}
        <div className="md:col-span-2 flex flex-col justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {medicines.name}
            </h3>
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span className="font-medium w-24">Kategori</span>:
                <span className="capitalize">{medicines.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium w-24">Harga</span>:
                <span className="text-green-600 font-semibold">
                  {formatRupiah(Number(medicines.price))}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium w-24">Satuan</span>:
                <span className="capitalize">{medicines.unit}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium w-24">Stok</span>:
                <span className="text-blue-600 font-semibold">
                  {medicines.stock}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
