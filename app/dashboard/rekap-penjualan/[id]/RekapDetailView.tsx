"use client";

import { useEffect, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import dynamic from "next/dynamic";
import {
  rekapPengeluanColumn,
  rekapPenjualanObatColumn,
  rekapPeramalanColumn,
} from "@/column/dashboard/rekapPenjualanColumn";
import { dataObat, pengeluaranData, peramalanData } from "@/data/rekapitulasi";
import { getChartDataUrl } from "@/utils/convertChartToImage";
import { barOptionsRekapPenjualan } from "@/chart/barOptionsRekapPenjualan";
import { customDataTableStyles } from "@/components/datatable/tableStyle";
import InformasiUmum from "./components/InformasiUmum";
import TandaTangan from "./components/TandaTangan";

const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

export default function DetailRekapView() {
  const [search, setSearch] = useState<string>("");
  const [chartImage, setChartImage] = useState<string>("");
  const chartRef = useRef<ReactECharts | null>(null);

  useEffect(() => {
    const updateChartImage = () => {
      const url = getChartDataUrl(chartRef);
      if (url) setChartImage(url);
    };

    updateChartImage();
    window.addEventListener("beforeprint", updateChartImage);
    return () => window.removeEventListener("beforeprint", updateChartImage);
  }, []);

  const handlePrint = async () => {
    const url = getChartDataUrl(chartRef);
    if (url) {
      setChartImage(url);
      await new Promise((r) => requestAnimationFrame(() => r(null)));
      await new Promise((r) => setTimeout(r, 100));
    }
    window.print();
  };

  const filteredData = dataObat.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  const totalObat = filteredData.reduce((acc, item) => acc + item.jumlah, 0);
  const totalHarga = filteredData.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="space-y-6">
      {/* Tombol Aksi */}
      <div className="flex gap-2 no-print">
        <button
          onClick={() => history.back()}
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Kembali
        </button>
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Cetak Laporan
        </button>
      </div>

      {/* Laporan */}
      <div
        id="print-area"
        className="bg-white p-6 md:p-10 rounded-md text-black text-sm leading-relaxed space-y-10"
      >
        <div className="space-y-6 mb-16">
          {/* Kop Surat */}

          {/* Judul */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold uppercase">
              Rekapitulasi Penjualan Obat
            </h2>
            <p className="text-sm">Periode: Juli 2025</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Informasi Umum */}
          <InformasiUmum
            createdAt="1 Agustus 2025"
            jumlahTransaksi={30}
            totalObat={totalObat}
            totalHarga={totalHarga}
            topObat={dataObat[0].nama}
          />

          {/* Tabel Detail Penjualan */}
          <div className="bg-gray-50 border rounded-md shadow-sm p-4">
            <h3 className="font-semibold text-lg md:text-xl mb-3">
              Detail Penjualan Obat
            </h3>
            <DataTable
              columns={rekapPenjualanObatColumn}
              data={filteredData}
              customStyles={customDataTableStyles}
            />
          </div>

          {/* Grafik Obat Terlaris */}
          <div className="bg-gray-50 border rounded-md shadow-sm p-4">
            <h3 className="font-semibold text-lg md:text-xl mb-3">
              Grafik Obat Terlaris
            </h3>
            <div>
              {/* Tampilkan chart biasa di layar */}
              <div className="block print:hidden w-full overflow-x-auto">
                <ReactECharts
                  ref={chartRef}
                  option={barOptionsRekapPenjualan}
                  className="w-full h-96"
                />
              </div>

              {/* Tampilkan versi gambar saat print */}
              {chartImage && (
                <div className="hidden print:block">
                  <img
                    src={chartImage}
                    alt="Chart Snapshot"
                    className="w-full max-w-[800px] mx-auto"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Tabel Ringkasan Pengeluaran */}
          <div className="bg-gray-50 border rounded-md shadow-sm p-4">
            <h3 className="font-semibold text-lg md:text-xl mb-3">
              Rekap Pengeluaran Obat 4 Minggu Terakhir
            </h3>
            <DataTable
              columns={rekapPengeluanColumn}
              data={pengeluaranData}
              customStyles={customDataTableStyles}
            />
          </div>

          {/* Tabel Peramalan */}
          <div className="bg-gray-50 border rounded-md shadow-sm p-4">
            <h3 className="font-semibold text-lg md:text-xl mb-3">
              Peramalan Penjualan Obat 4 Minggu Mendatang
            </h3>
            <DataTable
              columns={rekapPeramalanColumn}
              data={peramalanData}
              customStyles={customDataTableStyles}
            />
          </div>
        </div>
        {/* Tanda Tangan */}
        <TandaTangan createdAt="1 Agustus 2025" />
      </div>
    </div>
  );
}
