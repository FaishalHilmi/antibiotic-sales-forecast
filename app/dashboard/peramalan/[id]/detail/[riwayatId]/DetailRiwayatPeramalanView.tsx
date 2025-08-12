"use client";

import dynamic from "next/dynamic";
import ReactECharts from "echarts-for-react";
import { headersBoldStyle } from "@/components/datatable/headersBoldStyle";
import { getForecastChartOptions } from "@/chart/lineChartPeramalan";
import { detailRiwayatPeramalanColumn } from "@/column/dashboard/peramalan";
import { ForecastResult, ForecastSummary } from "@/types/forecasting";
import { MedicineState } from "@/types/medicine";

const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

export default function DetailRiwayatPeramalanView({
  forecastingResultDetail,
}: {
  forecastingResultDetail: {
    forecastingResult: ForecastResult[];
    forecastingSummary: ForecastSummary;
    medicine: MedicineState;
  };
}) {
  const { forecastingResult, forecastingSummary, medicine } =
    forecastingResultDetail;
  const totalForecastLast4 = forecastingResult
    .slice(-4) // ambil 4 data terakhir
    .reduce((total, item) => {
      const value = parseFloat(item.forecastValue || "0");
      return total + (isNaN(value) ? 0 : value);
    }, 0);

  return (
    <div>
      <div className="p-4 rounded-3xl bg-white border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Grafik Peramalan</h2>
        <ReactECharts
          option={getForecastChartOptions(forecastingResult)}
          className="h-[350px]"
        />
      </div>
      <div className="mt-6 p-4 rounded-3xl bg-white border border-gray-200">
        <div>
          <h2 className="text-xl font-semibold mb-6">Tabel Data Peramalan</h2>
          <DataTable
            columns={detailRiwayatPeramalanColumn}
            data={forecastingResult}
            highlightOnHover
            striped
            customStyles={headersBoldStyle}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Kesimpulan Peramalan
          </h2>
          <div className="text-gray-700">
            <div className="mb-4 md:mb-0">
              <table className="text-sm w-auto table-fixed rounded-xl">
                <tbody className="space-y-1">
                  <tr>
                    <td className="font-semibold">Bobot yang Digunakan</td>
                    <td>
                      : {JSON.parse(forecastingSummary.weightMethod).join(", ")}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Rata-rata MAE</td>
                    <td>: {forecastingSummary.avgMae}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Rata-rata MAPE</td>
                    <td>: {forecastingSummary.avgMape}%</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-4 text-gray-700">
                Berdasarkan hasil peramalan, kebutuhan {medicine.name} untuk 4
                minggu ke depan diperkirakan mencapai sekitar{" "}
                <span className="font-semibold">
                  {Math.round(totalForecastLast4)}
                </span>{" "}
                {medicine.unit}. Jumlah ini diharapkan mampu menjaga
                ketersediaan stok dan mencegah terjadinya kekurangan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
