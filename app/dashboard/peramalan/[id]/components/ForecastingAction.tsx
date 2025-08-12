"use client";

import Modal from "@/components/Modal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ForecastingAction({
  medicineId,
}: {
  medicineId: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [forecastId, setForecastId] = useState<string | null>(null);
  const router = useRouter();

  const handleForecasting = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/forecast/${medicineId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const req = await res.json();

      if (!res.ok) {
        throw Error(req.message || "Gagal fetch API");
      }

      setForecastId(req.forecastHistory.id);
      setIsModalOpen(true);

      toast.success("Berhasil melakukan peramalan");
    } catch (error: any) {
      toast.error("Gagal melakukan peramalan");
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <Link
          href={"/dashboard/peramalan/"}
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Kembali
        </Link>
        <button
          onClick={handleForecasting}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Tambah Peramalan
        </button>
      </div>

      {/* Modal setelah forecasting berhasil */}
      <Modal
        isOpen={isModalOpen}
        onCloseAction={() => setIsModalOpen(false)}
        title="Ingin melihat hasil peramalan?"
      >
        <div className="flex flex-col gap-4 items-center">
          <p className="text-center">
            Peramalan berhasil dibuat. Klik tombol di bawah untuk melihat
            hasilnya.
          </p>
          <button
            onClick={() => {
              setIsModalOpen(false);
              if (forecastId) {
                router.push(
                  `/dashboard/peramalan/${medicineId}/detail/${forecastId}`
                );
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
