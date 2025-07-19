import DetailRekapitulasiView from "./RekapDetailView";

export default function DetailRekapPage() {
  return (
    <div>
      <div className="wrapper">
        <h2 className="text-2xl font-bold mb-1">Detail Rekapitulasi</h2>
        <p className="text-primary mb-4">
          Lihat detail rekapitulasi penjualan yang telah dibuat
        </p>
        <DetailRekapitulasiView />
      </div>
    </div>
  );
}
