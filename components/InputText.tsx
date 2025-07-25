import { InputProps } from "@/types/input";

export default function InputText({
  label,
  type = "text",
  id,
  value,
  onChange,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-black">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value ?? ""}
        onChange={onChange}
        className="border border-gray-300 rounded-lg py-1.5 px-3 outline-primary"
        required
      />
    </div>
  );
}
