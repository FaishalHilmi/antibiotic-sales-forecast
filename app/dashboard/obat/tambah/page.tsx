import TambahObatFormView from "./TambahObatFormView";

export default function TambahObatPage() {
  return (
    <div className="wrapper">
      <h2 className="text-2xl font-bold mb-1">Tambah Obat</h2>
      <p className="text-primary mb-6">
        Lengkapi informasi berikut untuk menambahkan obat
      </p>
      <TambahObatFormView />
    </div>
  );
}
