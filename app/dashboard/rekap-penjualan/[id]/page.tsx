import { cookies } from "next/headers";
import DetailRekapitulasiView from "./RekapDetailView";
import toast from "react-hot-toast";

export default async function DetailRekapPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  const { id: salesRecapId } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/sales-recap/${salesRecapId}`,
    {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  );
  const req = await res.json();

  if (!res.ok) {
    throw new Error(req.message || "Gagal fetch API");
  }

  const salesRecapDetail = req.payload;

  return (
    <div>
      <div className="wrapper">
        <h2 className="text-2xl font-bold mb-1">Detail Rekapitulasi</h2>
        <p className="text-primary mb-4">
          Lihat detail rekapitulasi penjualan yang telah dibuat
        </p>
        <DetailRekapitulasiView {...salesRecapDetail} />
      </div>
    </div>
  );
}
