import { cookies } from "next/headers";
import KelolaKasirView from "./KelolaKasirView";

export default async function KelolaKasirPage() {
  const cookieStore = await cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/account/cashier`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  );
  const req = await res.json();

  if (!res.ok) {
    throw new Error(req.message || "Gagal fetching API");
  }

  const cashierAccount = await req.payload;
  return (
    <div>
      <div className="wrapper">
        <h2 className="text-2xl font-bold mb-1">Kelola Akun Kasir</h2>
        <p className="text-primary mb-4">
          Lihat dan kelola data akun kasir yang tersedia
        </p>
        <KelolaKasirView cashierAccount={cashierAccount} />
      </div>
    </div>
  );
}
