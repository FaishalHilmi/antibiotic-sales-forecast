import RekapPenjualanView from "./RekapPenjualanView";

export default function RekapPenjualanPage() {
  return (
    <div>
      <div className="wrapper">
        <h2 className="text-2xl font-bold mb-1">Kelola Penjualan</h2>
        <p className="text-primary mb-4">
          Lihat dan kelola data penjualan yang tersedia
        </p>
        <RekapPenjualanView />
      </div>
    </div>
  );
}
