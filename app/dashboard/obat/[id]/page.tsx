import Link from "next/link";
import DetailObatView from "./DetailObatView";
import { cookies } from "next/headers";

export default async function DetailObatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  const { id: medicineId } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/medicines/${medicineId}`,
    {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw Error("Gagal fetch API");
  }

  const req = await res.json();
  const medicine = req.payload;

  return (
    <div className="wrapper">
      <h2 className="text-2xl font-bold mb-1">Detail Obat</h2>
      <p className="text-primary mb-4">Lihat informasi lengkap mengenai obat</p>
      <div className="flex gap-2 mb-6">
        <Link
          href={"/dashboard/obat"}
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Kembali
        </Link>
        <Link
          href={`/dashboard/obat/edit/${medicineId}`}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Ubah Obat
        </Link>
      </div>
      <DetailObatView medicines={medicine} />
    </div>
  );
}
