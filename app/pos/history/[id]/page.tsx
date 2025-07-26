import React from "react";
import DetailTransaksiView from "./DetailTransaksiView";

export default function DetailTransaksiPage() {
  return (
    <div className="wrapper">
      <h2 className="text-2xl font-bold mb-1">Detail Transaksi Penjualan</h2>
      <p className="text-primary mb-6">
        Lihat informasi lengkap mengenai transaksi
      </p>
      <DetailTransaksiView />
    </div>
  );
}
