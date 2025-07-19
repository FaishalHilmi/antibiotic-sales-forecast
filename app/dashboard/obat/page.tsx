import KelolaObatView from "./KelolaObatView";

export default function KelolaObatpage() {
  return (
    <div>
      <div className="wrapper">
        <h2 className="text-2xl font-bold mb-1">Kelola Obat</h2>
        <p className="text-primary mb-4">
          Lihat dan kelola data obat yang tersedia
        </p>
        <KelolaObatView />
      </div>
    </div>
  );
}
