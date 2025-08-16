"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import TransactionReceipt from "@/components/TransactionReceipt";
import { MoveLeft, Printer } from "lucide-react";
import { headersBoldStyle } from "@/components/datatable/headersBoldStyle";
import { TransactionProps } from "@/types/transaction";
import { itemSummaryColumn } from "@/column/pos/transactionColumn";
import { formatTanggal, formatWaktuWIB } from "@/utils/date";
import { formatRupiah } from "@/utils/formatCurrency";

const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

export default function DetailTransaksiView({ transaction }: TransactionProps) {
  const date = formatTanggal(transaction.createdAt);
  const hour = formatWaktuWIB(transaction.createdAt);
  const datetime = `${date} ${hour}`;

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
                ID Transaksi{" "}
                <span className="text-primary">{transaction.id}</span>
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
              ID Transaksi{" "}
              <span className="text-primary">{transaction.id}</span>
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
              columns={itemSummaryColumn}
              data={transaction.details}
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
                <span className="text-end">{date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Waktu Transaksi</span>
                <span>{hour}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Jumlah Item</span>
                <span>{transaction.totalItems} Item</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Metode Pembayaran</span>
                <span className="uppercase">{transaction.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Kasir</span>
                <span className="capitalize">{transaction.cashier.name}</span>
              </div>
            </div>
            <div className="w-full flex justify-between bg-primary-dark text-white font-bold text-base p-3 rounded-lg">
              <span>Total</span>
              <span>{formatRupiah(Number(transaction.totalAmount))}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Komponen Struk untuk Cetak */}
      <div className="receipt-print hidden print:block" id="print-area">
        <TransactionReceipt
          transactionId={transaction.id}
          datetime={datetime}
          cashierName={transaction.cashier.name}
          items={transaction.details.map((item) => ({
            itemName: item.medicine.name,
            quantity: item.quantity,
            price: parseInt(item.unitPrice),
            total: parseInt(item.subtotal),
          }))}
          subTotal={parseInt(transaction.totalAmount)}
        />
      </div>
    </div>
  );
}
