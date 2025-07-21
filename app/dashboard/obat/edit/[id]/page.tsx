import Link from "next/link";
import EditObatFormView from "./EditObatFormView";

export default function EditObatPage() {
  return (
    <div className="wrapper">
      <h2 className="text-2xl font-bold mb-1">Ubah Obat</h2>
      <p className="text-primary mb-6">
        Lengkapi informasi berikut untuk mengubah obat
      </p>
      <div className="mb-6">
        <Link
          href={"/dashboard/obat"}
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Kembali
        </Link>
      </div>
      <EditObatFormView />
    </div>
  );
}
