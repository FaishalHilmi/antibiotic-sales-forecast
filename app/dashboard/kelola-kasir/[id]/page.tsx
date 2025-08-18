import Link from "next/link";
import React from "react";
import DetailKasirView from "./DetailKasirView";

export default function DetailKasirPage() {
  return (
    <div className="wrapper">
      <h2 className="text-2xl font-bold mb-1">Ubah Akun Kasir</h2>
      <p className="text-primary mb-6">
        Lengkapi informasi berikut untuk mengubah akun kasir
      </p>
      <div className="mb-6">
        <Link
          href={"/dashboard/kelola-kasir"}
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Kembali
        </Link>
      </div>
      <DetailKasirView />
    </div>
  );
}
