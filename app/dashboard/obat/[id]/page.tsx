import DetailObatView from "./DetailObatView";

export default function DetailObatPage() {
  return (
    <div className="wrapper">
      <h2 className="text-2xl font-bold mb-1">Detail Obat</h2>
      <p className="text-primary mb-6">Lihat informasi lengkap mengenai obat</p>
      <DetailObatView />
    </div>
  );
}
