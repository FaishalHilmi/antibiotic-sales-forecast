import DashboardView from "./DashboardView";

export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Halo, Admin 👋</h2>
      <p className="text-gray-500 mb-4 md:mb-6">
        Ini ringkasan penjualan dan aktivitas hari ini.
      </p>
      <DashboardView />
    </div>
  );
}
