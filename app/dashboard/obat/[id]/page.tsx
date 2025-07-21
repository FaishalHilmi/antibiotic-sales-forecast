import Link from "next/link";
import DetailObatView from "./DetailObatView";

export default function DetailObatPage() {
  return (
    <div className="wrapper">
      <h2 className="text-2xl font-bold mb-1">Detail Obat</h2>
      <p className="text-primary mb-6">Lihat informasi lengkap mengenai obat</p>
      <div className="mb-6">
        <Link
          href={"/dashboard/obat"}
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Kembali
        </Link>
      </div>
      <DetailObatView />
    </div>
  );
}
