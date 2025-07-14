"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { MoveLeft, Printer, SquarePen } from "lucide-react";

const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false, // ✅ Ini penting untuk mencegah SSR
});

export default function DetailTransaksiView() {
  // Data dummy
  const data = [
    { id: 1, itemName: "Paracetamol", quantity: 2, price: 5000, total: 10000 },
    { id: 2, itemName: "Amoxicillin", quantity: 1, price: 8000, total: 8000 },
    { id: 3, itemName: "Vitamin C", quantity: 3, price: 4000, total: 12000 },
  ];

  // Detail Transaksi Column
  const columns = [
    {
      name: "Nama Item",
      selector: (row: any) => row.itemName,
      sortable: true,
    },
    {
      name: "Jumlah",
      selector: (row: any) => row.quantity,
      sortable: true,
    },
    {
      name: "Harga",
      selector: (row: any) => `Rp ${row.price.toLocaleString()}`,
      sortable: true,
    },
    {
      name: "Total Harga",
      selector: (row: any) => `Rp ${row.total.toLocaleString()}`,
      sortable: true,
    },
  ];

  // Custom Styles untuk heading tabel
  const customStyles = {
    headCells: {
      style: {
        fontWeight: "700", // Bold
        fontSize: "14px", // Ukuran font
      },
    },
  };

  return (
    <div>
      <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-7">
        <div className="header flex flex-col md:flex-row justify-between md:items-center mb-7">
          <div className="link-back mb-3 md:mb-0">
            <Link
              href={"/dashboard/penjualan"}
              className="flex gap-2 text-sm md:text-base"
            >
              {" "}
              <MoveLeft className="w-5 text-black" />{" "}
              <span className="text-black">Riwayat Penjualan</span>
            </Link>
          </div>
          <div className="mobile-section flex flex-col justify-between gap-2 md:hidden">
            <div className="id-transaction md:hidden">
              <span className="font-bold text-sm">
                ID Transaksi <span className="text-primary">AB13132</span>
              </span>
            </div>
            <div className="button-action flex gap-2">
              <button className="text-xs md:text-md bg-primary flex items-center gap-2 px-3 py-2 rounded-lg">
                <Printer className="w-4 text-white" />
                <span className="text-white">Cetak Struk</span>
              </button>
            </div>
          </div>
          <div className="id-transaction hidden md:inline">
            <span className="font-bold">
              ID Transaksi <span className="text-primary">AB13132</span>
            </span>
          </div>
          <div className="button-action gap-2 hidden md:flex">
            <button className="text-sm md:text-md bg-primary flex items-center gap-2 px-3 py-2 rounded-lg">
              <Printer className="w-4 text-white" />
              <span className="text-white">Cetak Struk</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-9">
          <div className="col-span-1 md:col-span-2 border border-gray-200 rounded-xl p-3 md:p-4">
            <h1 className="font-bold text-lg md:text-xl">Rincian Item</h1>
            {typeof window !== "undefined" && (
              <DataTable
                columns={columns}
                data={data}
                pagination
                highlightOnHover
                responsive
                customStyles={customStyles}
              />
            )}
          </div>
          <div className="cols-span-1">
            <div className="border border-gray-200 rounded-xl p-3 md:p-4 flex flex-col gap-7">
              <h1 className="font-bold text-lg md:text-xl">Rincian Pesanan</h1>
              <div className="detail flex flex-col gap-2 md:gap-1">
                <div className="detail-item flex justify-between text-xs md:text-sm">
                  <span className="font-bold">Tanggal Pemesanan</span>
                  <span className="font-medium text-end">
                    Kamis, 17 Desember 2025
                  </span>
                </div>
                <div className="detail-item flex justify-between text-xs md:text-sm">
                  <span className="font-bold">Waktu Transaksi</span>
                  <span className="font-medium">14:24 WIB</span>
                </div>
                <div className="detail-item flex justify-between text-xs md:text-sm">
                  <span className="font-bold">Jumlah Item</span>
                  <span className="font-medium">6 Item</span>
                </div>
              </div>
              <div className="total w-full flex justify-between bg-primary-dark text-sm md:text-base p-2 md:p-3 rounded-lg">
                <span className="font-bold text-white">Total</span>
                <span className="font-bold text-white">Rp 80.000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
