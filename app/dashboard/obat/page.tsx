import { MedicineState } from "@/types/medicine";
import KelolaObatView from "./KelolaObatView";
import { cookies } from "next/headers";

export default async function KelolaObatpage() {
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/medicines`, {
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
  const medicines = req.payload;

  return (
    <div>
      <div className="wrapper">
        <h2 className="text-2xl font-bold mb-1">Kelola Obat</h2>
        <p className="text-primary mb-4">
          Lihat dan kelola data obat yang tersedia
        </p>
        <KelolaObatView medicines={medicines} />
      </div>
    </div>
  );
}
