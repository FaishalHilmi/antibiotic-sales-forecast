import { ReactNode } from "react";

export default function SummaryCard({
  title,
  subtitle,
  value,
  icon,
}: {
  title: string;
  subtitle: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="cols-span-1 border p-3 md:p-4 rounded-xl bg-white flex justify-between items-center">
      <div className="text">
        <h1 className="font-medium text-md md:text-lg text-gray-500">
          {title}
        </h1>
        <span className="text-sm -mt-1 text-gray-400 block mb-3">
          {subtitle}
        </span>
        <span className="font-bold text-xl">{value} Produk</span>
      </div>
      <div className="icon p-3.5 bg-primary rounded-lg flex items-center h-fit shadow-lg">
        {/* <ShoppingCart className="text-white w-6 h-6" /> */}
        {icon}
      </div>
    </div>
  );
}
