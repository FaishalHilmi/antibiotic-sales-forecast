import { SelectInputProps } from "@/types/input";

export default function SelectInput({
  label,
  id,
  options,
  value,
  onChange,
}: SelectInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={id}
        className="border border-gray-300 rounded-lg py-1.5 px-3 outline-primary"
        value={value}
        onChange={onChange}
        required
      >
        <option value="">Pilih {label.toLowerCase()}</option>
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
