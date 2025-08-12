import InformasiObat from "./components/InformasiObat";
import RiwayatPeramalan from "./components/RiwayatPeramalan";
import { cookies } from "next/headers";
import React from "react";
import ForecastingAction from "./components/ForecastingAction";

export default async function DetailPeramalanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  const { id: medicineId } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/forecast/${medicineId}`,
    {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw Error("Gagal fetch API");
  }

  const req = await res.json();
  const medicine = req.payload.medicine;
  const historyForecast = req.payload.medicineForecastDetail;

  return (
    <div>
      <div className="wrapper">
        <h2 className="text-2xl font-bold mb-1">Detail Obat Peramalan</h2>
        <p className="text-primary mb-6">
          Informasi Obat dan Riwayat Peramalan Penjualan
        </p>
        <ForecastingAction medicineId={medicineId} />
        {/* Informasi Singkat */}
        <InformasiObat medicine={medicine} />
        {/* Riwayat Peramalan */}
        <RiwayatPeramalan historyForecast={historyForecast} />
      </div>
    </div>
  );
}
