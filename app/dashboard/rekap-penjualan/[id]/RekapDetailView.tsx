"use client";

import { useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import dynamic from "next/dynamic";
import { rekapPenjualanObatColumn } from "@/column/dashboard/rekapPenjualanColumn";
import { dataObat, pengeluaranData, peramalanData } from "@/data/rekapitulasi";
import { getChartDataUrl } from "@/utils/convertChartToImage";
import { barOptionsRekapPenjualan } from "@/chart/barOptionsRekapPenjualan";
import { customDataTableStyles } from "@/components/datatable/tableStyle";
import InformasiUmum from "./components/InformasiUmum";
import TandaTangan from "./components/TandaTangan";
import HeaderRekap from "./components/HeaderRekap";
import { DataTopFiveMedicines, SaleRecap } from "@/types/sales";
import { formatTanggal } from "@/utils/date";
import { id } from "date-fns/locale";
import { format } from "date-fns";
import { formatRupiah } from "@/utils/formatCurrency";
import Link from "next/link";

const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

export default function DetailRekapView({
  saleRecap,
  dataTopFiveMedicines,
}: {
  saleRecap: SaleRecap;
  dataTopFiveMedicines: DataTopFiveMedicines[];
}) {
  const [search, setSearch] = useState<string>("");
  const [chartImage, setChartImage] = useState<string>("");
  const chartRef = useRef<ReactECharts | null>(null);

  const year = saleRecap.year;
  const date = new Date(year, saleRecap.month - 1); // -1 karena bulan mulai dari 0
  const monthName = format(date, "MMMM", { locale: id });
  const latestDate = format(saleRecap.updatedAt, "d MMMM yyyy", { locale: id });
  const createdAt = formatTanggal(saleRecap.updatedAt);
  const totalSoldQuantity = saleRecap.totalSoldQuantity;
  const totalTransactions = saleRecap.totalTransactions;
  const grossRevenue = formatRupiah(Number(saleRecap.grossRevenue));
  const topSellingMedicine = saleRecap.topSellingMedicine;
  const recapDetails = saleRecap.recapDetails;

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
        <Link
          // onClick={() => history.back()}
          href={"/dashboard/rekap-penjualan"}
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Kembali
        </Link>
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
          <HeaderRekap />

          {/* Judul */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold uppercase">
              Rekapitulasi Penjualan Obat
            </h2>
            <p className="text-sm">
              Periode: {monthName} {year}
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Informasi Umum */}
          <InformasiUmum
            createdAt={createdAt}
            jumlahTransaksi={totalTransactions}
            totalObat={totalSoldQuantity}
            totalHarga={grossRevenue}
            topObat={topSellingMedicine}
          />

          {/* Tabel Detail Penjualan */}
          <div className="bg-gray-50 border rounded-md shadow-sm p-4">
            <h3 className="font-semibold text-lg md:text-xl mb-3">
              Detail Penjualan Obat
            </h3>
            <DataTable
              columns={rekapPenjualanObatColumn}
              data={recapDetails}
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
                  option={barOptionsRekapPenjualan(dataTopFiveMedicines)}
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
          {/* <div className="bg-gray-50 border rounded-md shadow-sm p-4">
            <h3 className="font-semibold text-lg md:text-xl mb-3">
              Rekap Pengeluaran Obat 4 Minggu Terakhir
            </h3>
            <DataTable
              columns={rekapPengeluanColumn}
              data={pengeluaranData}
              customStyles={customDataTableStyles}
            />
          </div> */}

          {/* Tabel Peramalan */}
          {/* <div className="bg-gray-50 border rounded-md shadow-sm p-4">
            <h3 className="font-semibold text-lg md:text-xl mb-3">
              Peramalan Penjualan Obat 4 Minggu Mendatang
            </h3>
            <DataTable
              columns={rekapPeramalanColumn}
              data={peramalanData}
              customStyles={customDataTableStyles}
            />
          </div> */}
        </div>
        {/* Tanda Tangan */}
        <TandaTangan createdAt={latestDate} />
      </div>
    </div>
  );
}
