import { SearchBarProps } from "@/types/searchbar";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Cari...",
  className = "",
}: SearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border border-gray-200 rounded-xl px-3 py-2 text-sm outline-gray-300 ${className}`}
    />
  );
}
