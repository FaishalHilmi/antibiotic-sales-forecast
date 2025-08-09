import { cookies } from "next/headers";
import DashboardView from "./DashboardView";
import { DataSummary } from "@/types/summary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = await getServerSession(authOptions);
  const name = session?.user?.name;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/summary`, {
    method: "GET",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw Error("Gagal fetch API");
  }

  const req = await res.json();
  const dataSummary: DataSummary = req.payload;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1 capitalize">Halo, {name} 👋</h2>
      <p className="text-gray-500 mb-4 md:mb-6">
        Ini ringkasan penjualan dan aktivitas hari ini.
      </p>
      <DashboardView summary={dataSummary} />
    </div>
  );
}
