import { InputImagePreviewProps } from "@/types/input";
import { useEffect, useState } from "react";

export default function InputImagePreview({
  label,
  id,
  image,
  setImage,
}: InputImagePreviewProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setMessage("Ukuran gambar maksimal 2MB.");
      setImage(null);
      setPreview(null);
      e.target.value = "";
      setTimeout(() => setMessage(""), 4000);
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setMessage("");
  };

  // Tampilkan preview awal dari imagePath (string URL) jika ada
  useEffect(() => {
    if (typeof image === "string" && image) {
      setPreview(image);
    } else if (image instanceof File) {
      setPreview(URL.createObjectURL(image));
    } else {
      setPreview(null);
    }

    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [image]);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <input
        type="file"
        id={id}
        name={id}
        accept=".jpg, .jpeg, .png"
        onChange={handleImageChange}
        className="border border-gray-300 rounded-lg py-1 px-3 outline-primary"
      />
      {message && <p className="text-red-600 text-sm mt-1">{message}</p>}
      {preview && (
        <div className="mt-3">
          <img
            src={preview}
            alt="Preview"
            className="h-32 object-cover rounded-lg border"
          />
        </div>
      )}
    </div>
  );
}
