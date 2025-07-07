"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

// Import DataTable secara dinamis (SSR disabled)
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

export default function History() {
  const [search, setSearch] = useState("");

  const columns = [
    {
      name: <span className="font-bold text-black">ID Transaksi</span>,
      selector: (row: any) => row.transactionId,
      sortable: true,
    },
    {
      name: <span className="font-bold text-black">Tanggal Transaksi</span>,
      selector: (row: any) => row.transactionDate,
      sortable: true,
    },
    {
      name: <span className="font-bold text-black">Total Harga</span>,
      selector: (row: any) => `Rp ${row.totalPrice.toLocaleString()}`,
      sortable: true,
    },
    {
      name: <span className="font-bold text-black">Nama Kasir</span>,
      selector: (row: any) => row.cashierName,
      sortable: true,
    },
    {
      name: <span className="font-bold text-black">Aksi</span>,
      cell: (row: any) => (
        <div className="flex flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-0">
          <Link
            href={`/history/${row.transactionId}`}
            className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg"
          >
            Detail
          </Link>
          <Link
            href={`/history/delete/${row.transactionId}`}
            className="bg-red-500 text-white text-xs px-3 py-2 rounded-lg"
          >
            Hapus
          </Link>
        </div>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      transactionId: "AB13132",
      transactionDate: "Sabtu, 19 Maret 2025",
      totalPrice: 50000,
      cashierName: "Admin 1",
    },
    {
      id: 2,
      transactionId: "AB13133",
      transactionDate: "Minggu, 20 Maret 2025",
      totalPrice: 80000,
      cashierName: "Admin 2",
    },
    {
      id: 3,
      transactionId: "AB13134",
      transactionDate: "Senin, 21 Maret 2025",
      totalPrice: 120000,
      cashierName: "Admin 1",
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "700", // Bold
        fontSize: "14px", // Ukuran font
      },
    },
  };

  const filteredData = data.filter(
    (item) =>
      item.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      item.cashierName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="wrapper">
        <h1 className="font-bold text-lg md:text-3xl mb-1">
          Riwayat Transaksi
        </h1>
        <span className="block text-primary">
          Catatan lengkap dari penjualan yang telah diselesaikan
        </span>
        <div className="table-wrapper p-4 mt-7 bg-white flex flex-col items-end border border-gray-200 rounded-3xl">
          <input
            type="text"
            placeholder="Cari ID atau Nama Kasir..."
            className="border border-gray-200 rounded-xl px-3 py-2 mb-4 text-sm outline-gray-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            highlightOnHover
            responsive
            customStyles={customStyles}
          />
        </div>
      </div>
    </div>
  );
}
