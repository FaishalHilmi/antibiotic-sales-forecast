import Link from "next/link";
import KelolaObatView from "./KelolaObatView";

export default function KelolaObatpage() {
  return (
    <div>
      <div className="wrapper">
        <h2 className="text-2xl font-bold mb-1">Kelola Obat</h2>
        <p className="text-primary mb-4">
          Lihat dan kelola data obat yang tersedia
        </p>
        <Link
          href={"/"}
          className="py-2 px-3.5 border rounded-lg text-sm bg-primary text-white shadow-md hover:shadow-none hover:scale-95 transition-all duration-300 mb-4 md:mb-6"
        >
          Tambah Obat
        </Link>
        <KelolaObatView />
      </div>
    </div>
  );
}
