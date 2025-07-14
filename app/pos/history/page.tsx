import RiwayatPenjualanView from "./RiwayatPenjualanView";

export default function History() {
  return (
    <div>
      <div className="wrapper">
        <h1 className="font-bold text-lg md:text-3xl mb-1">
          Riwayat Transaksi
        </h1>
        <span className="block text-primary">
          Catatan lengkap dari penjualan yang telah diselesaikan
        </span>
        <RiwayatPenjualanView />
      </div>
    </div>
  );
}
