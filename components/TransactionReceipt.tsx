"use client";

import { forwardRef } from "react";

type Item = {
  itemName: string;
  quantity: number;
  price: number;
  total: number;
};

type Props = {
  transactionId: string;
  datetime: string;
  cashierName: string;
  items: Item[];
  subTotal: number;
};

const TransactionReceipt = forwardRef<HTMLDivElement, Props>(
  ({ transactionId, datetime, cashierName, items, subTotal }, ref) => {
    return (
      <div
        ref={ref}
        className="p-2 w-full text-xs font-mono text-black print:block"
      >
        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="font-bold">Apotek Fajar Cempaka</h1>
          <p>Jl. Cempaka No.35, Sari Rejo</p>
          <p>Kec. Medan Polonia, Kota Medan</p>
          <p>Sumatera Utara</p>
          <p>Telp: (061) 1234567</p>
        </div>

        <hr className="border border-dashed border-black my-2" />

        {/* Info Transaksi */}
        <div className="mb-2">
          <p>
            ID Transaksi: <strong>{transactionId}</strong>
          </p>
          <p>Tanggal: {datetime}</p>
          <p>Kasir: {cashierName}</p>
        </div>

        <hr className="border border-dashed border-black my-2" />

        {/* Rincian Item */}
        <div className="mb-2">
          {items.map((item, index) => (
            <div key={index} className="mb-1">
              <p className="font-semibold">{item.itemName}</p>
              <div className="flex justify-between">
                <span>
                  {item.quantity} x Rp {item.price.toLocaleString()}
                </span>
                <span>Rp {item.total.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>

        <hr className="border border-dashed border-black my-2" />

        {/* Total */}
        <div className="flex justify-between text-sm font-bold">
          <span>Subtotal</span>
          <span>Rp {subTotal.toLocaleString()}</span>
        </div>

        <div className="text-center mt-4">
          <p>~ Terima Kasih ~</p>
        </div>
      </div>
    );
  }
);

TransactionReceipt.displayName = "TransactionReceipt"; // wajib agar tidak error
export default TransactionReceipt;
