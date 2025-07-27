export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[85vh] space-y-4">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>

      {/* Loading Text */}
      <p className="text-gray-600 font-medium">Sedang memuat data...</p>
    </div>
  );
}
