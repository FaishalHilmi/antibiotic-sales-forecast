import Link from "next/link";
import React from "react";
import TambahKasirFormView from "./TambahKasirFormView";

export default function TambahKasirFormPage() {
  return (
    <div className="wrapper">
      <h2 className="text-2xl font-bold mb-1">Tambah Akun Kasir</h2>
      <p className="text-primary mb-6">
        Lengkapi informasi berikut untuk menambahkan akun kasir
      </p>
      <div className="mb-6">
        <Link
          href={"/dashboard/kelola-kasir"}
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Kembali
        </Link>
      </div>
      <TambahKasirFormView />
    </div>
  );
}
