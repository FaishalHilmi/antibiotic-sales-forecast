import Link from "next/link";
import TambahObatFormView from "./TambahObatFormView";

export default function TambahObatPage() {
  return (
    <div className="wrapper">
      <h2 className="text-2xl font-bold mb-1">Tambah Obat</h2>
      <p className="text-primary mb-6">
        Lengkapi informasi berikut untuk menambahkan obat
      </p>
      <div className="mb-6">
        <Link
          href={"/dashboard/obat"}
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Kembali
        </Link>
      </div>
      <TambahObatFormView />
    </div>
  );
}
