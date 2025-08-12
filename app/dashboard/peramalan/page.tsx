import { cookies } from "next/headers";
import PeramalanView from "./PeramalanView";
import toast from "react-hot-toast";

export default async function PeramalanPage() {
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/forecast`, {
    method: "GET",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Gagal Fetch API - Status ${res.status}`);
  }

  const req = await res.json();
  const forecastMedicines = req.payload;

  return (
    <div>
      <div className="wrapper">
        <h2 className="text-2xl font-bold mb-1">Peramalan</h2>
        <p className="text-primary mb-4">
          Lihat peramalan penjualan obat untuk membantu perencanaan stok
          mingguan
        </p>
        <PeramalanView forecastMedicines={forecastMedicines} />
      </div>
    </div>
  );
}
