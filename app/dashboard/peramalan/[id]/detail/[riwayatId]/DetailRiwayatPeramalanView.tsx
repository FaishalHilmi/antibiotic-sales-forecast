"use client";

import dynamic from "next/dynamic";
import ReactECharts from "echarts-for-react";
import { headersBoldStyle } from "@/components/datatable/headersBoldStyle";
import { getForecastChartOptions } from "@/chart/lineChartPeramalan";
import { detailRiwayatPeramalanColumn } from "@/column/dashboard/peramalan";
import { riwayatPeramalanDummyData } from "@/data/peramalan";

const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

// Hitung nilai kesimpulan
const periode = 4;
const bobot = [0.4, 0.3, 0.2, 0.1]; // total 1
const nilaiAktualTerbaru = riwayatPeramalanDummyData
  .slice(-periode)
  .map((d) => d.aktual);
const ramalanMingguKedepan: number[] = [];

for (let i = 0; i < 4; i++) {
  const values = nilaiAktualTerbaru
    .slice(i)
    .concat(ramalanMingguKedepan.slice(0, i));
  if (values.length < periode) {
    const fill = new Array(periode - values.length).fill(
      nilaiAktualTerbaru.at(-1)
    );
    values.unshift(...fill);
  }
  const result = values
    .slice(-periode)
    .reduce((acc, val, idx) => acc + val * bobot[idx], 0);
  ramalanMingguKedepan.push(parseFloat(result.toFixed(2)));
}

const mapeValues = riwayatPeramalanDummyData
  .filter((d) => d.mape !== null)
  .map((d) => d.mape as number);
const maeValues = riwayatPeramalanDummyData
  .filter((d) => d.mae !== null)
  .map((d) => d.mae as number);

const avgMAPE = (
  mapeValues.reduce((a, b) => a + b, 0) / mapeValues.length
).toFixed(2);
const avgMAE = (
  maeValues.reduce((a, b) => a + b, 0) / maeValues.length
).toFixed(2);

export default function DetailRiwayatPeramalanView() {
  return (
    <div>
      <div className="p-4 rounded-3xl bg-white border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Grafik Peramalan</h2>
        <ReactECharts
          option={getForecastChartOptions(riwayatPeramalanDummyData)}
          className="h-[350px]"
        />
      </div>
      <div className="mt-6 p-4 rounded-3xl bg-white border border-gray-200">
        <div>
          <h2 className="text-xl font-semibold mb-6">Tabel Data Peramalan</h2>
          <DataTable
            columns={detailRiwayatPeramalanColumn}
            data={riwayatPeramalanDummyData}
            pagination
            highlightOnHover
            striped
            customStyles={headersBoldStyle}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Kesimpulan Peramalan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div className="mb-4 md:mb-0">
              <table className="text-sm w-full table-fixed rounded-xl">
                <tbody className="space-y-1">
                  <tr>
                    <td className="font-semibold w-40">Periode Peramalan</td>
                    <td>: {periode} minggu</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Bobot yang Digunakan</td>
                    <td>: {bobot.join(", ")}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Rata-rata MAE</td>
                    <td>: {avgMAE}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Rata-rata MAPE</td>
                    <td>: {avgMAPE}%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Tabel Peramalan */}
            {/* <div>
              <p className="mb-2">Hasil Peramalan 4 Minggu ke Depan:</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border-b border-gray-200 px-2 py-1">
                      Minggu Ke-
                    </th>
                    <th className="border-b border-gray-200 px-2 py-1">
                      Hasil Peramalan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ramalanMingguKedepan.map((val, idx) => (
                    <tr key={idx}>
                      <td className="border-b border-gray-200 px-2 py-1 text-center">
                        {11 + idx}
                      </td>
                      <td className="border-b border-gray-200 px-2 py-1 text-center">
                        {val}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-b border-gray-200 font-semibold bg-gray-50">
                    <td className="px-2 py-1 text-center">Total</td>
                    <td className="px-2 py-1 text-center">
                      {ramalanMingguKedepan.reduce((a, b) => a + b, 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
