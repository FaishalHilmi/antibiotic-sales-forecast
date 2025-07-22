import PeramalanView from "./PeramalanView";

export default function PeramalanPage() {
  return (
    <div>
      <div className="wrapper">
        <h2 className="text-2xl font-bold mb-1">Peramalan</h2>
        <p className="text-primary mb-4">
          Lihat peramalan penjualan obat untuk membantu perencanaan stok
          mingguan
        </p>
        <PeramalanView />
      </div>
    </div>
  );
}
