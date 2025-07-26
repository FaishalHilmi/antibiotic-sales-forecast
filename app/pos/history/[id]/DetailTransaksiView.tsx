"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { MoveLeft, Printer } from "lucide-react";
import TransactionReceipt from "@/components/TransactionReceipt";
import { headersBoldStyle } from "@/components/datatable/headersBoldStyle";

const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

export default function DetailTransaksiView() {
  // Dummy Data
  const data = [
    { itemName: "Paracetamol", quantity: 2, price: 5000, total: 10000 },
    { itemName: "Amoxicillin", quantity: 1, price: 8000, total: 8000 },
    { itemName: "Vitamin C", quantity: 3, price: 4000, total: 12000 },
  ];

  const subTotal = data.reduce((sum, item) => sum + item.total, 0);

  const receiptData = {
    transactionId: "AB13132",
    datetime: "Kamis, 17 Desember 2025 14:24 WIB",
    cashierName: "Faishal Hilmy",
    items: data,
    subTotal,
  };

  const columns = [
    { name: "Nama Item", selector: (row: any) => row.itemName, sortable: true },
    { name: "Jumlah", selector: (row: any) => row.quantity, sortable: true },
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

  const handlePrint = () => window.print();

  return (
    <div>
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-7 no-print">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-7">
          <Link href="/pos/history" className="flex gap-2 text-sm md:text-base">
            <MoveLeft className="w-5 text-black" />
            <span className="text-black">Kembali</span>
          </Link>

          <div className="mobile-section flex flex-row justify-between items-center gap-2 md:hidden">
            <div className="id-transaction md:hidden">
              <span className="font-bold text-sm">
                ID Transaksi <span className="text-primary">AB13132</span>
              </span>
            </div>
            <div className="button-action flex gap-2">
              <button
                onClick={handlePrint}
                className="text-xs md:text-md bg-primary flex items-center gap-2 px-3 py-2 rounded-lg"
              >
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
            <button
              onClick={handlePrint}
              className="text-sm md:text-md bg-primary flex items-center gap-2 px-3 py-2 rounded-lg"
            >
              <Printer className="w-4 text-white" />
              <span className="text-white">Cetak Struk</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-9">
          <div className="col-span-1 md:col-span-2 border border-gray-200 rounded-xl p-3 md:p-4">
            <h1 className="font-bold text-lg md:text-xl mb-3">Rincian Item</h1>
            <DataTable
              columns={columns}
              data={data}
              pagination
              highlightOnHover
              responsive
              customStyles={headersBoldStyle}
            />
          </div>

          <div className="col-span-1 border border-gray-200 rounded-xl p-3 md:p-4 flex flex-col gap-5">
            <h1 className="font-bold text-lg md:text-xl">Rincian Pesanan</h1>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="font-bold">Tanggal Pemesanan</span>
                <span className="text-end">Kamis, 17 Desember 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Waktu Transaksi</span>
                <span>14:24 WIB</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Jumlah Item</span>
                <span>6 Item</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Metode Pembayaran</span>
                <span>Tunai</span>
              </div>
            </div>
            <div className="w-full flex justify-between bg-primary-dark text-white font-bold text-base p-3 rounded-lg">
              <span>Total</span>
              <span>Rp 80.000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Komponen Struk untuk Cetak */}
      <div className="receipt-print hidden print:block" id="print-area">
        <TransactionReceipt {...receiptData} />
      </div>
    </div>
  );
}
