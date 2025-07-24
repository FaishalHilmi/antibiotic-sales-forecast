import KelolaKasirView from "./KelolaKasirView";

export default function KelolaKasirPage() {
  return (
    <div>
      <div className="wrapper">
        <h2 className="text-2xl font-bold mb-1">Kelola Akun Kasir</h2>
        <p className="text-primary mb-4">
          Lihat dan kelola data akun kasir yang tersedia
        </p>
        <KelolaKasirView />
      </div>
    </div>
  );
}
