"use client";

import InputImagePreview from "@/components/InputImagePreview";
import InputText from "@/components/InputText";
import SelectInput from "@/components/SelectInput";
import { kategoriOptionsDummy, unitOption } from "@/data/kategoriOptionsDummy";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditObatFormView() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [medicineData, setMedicineData] = useState({
    imageFile: null as File | null,
    imagePath: "",
    name: "",
    category: "",
    unit: "",
    price: "" as string | null,
  });

  const handleChange = (key: keyof typeof medicineData, value: any) => {
    setMedicineData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getMedicineData = async () => {
    try {
      const res = await fetch(`/api/medicines/${id}`);
      if (!res.ok) throw new Error("Gagal memuat data obat");

      const req = await res.json();
      const medicine = req.payload;

      setMedicineData({
        imageFile: null,
        imagePath: medicine.imagePath,
        name: medicine.name,
        category: medicine.category,
        unit: medicine.unit,
        price: medicine.price,
      });
    } catch (error) {
      toast.error("Gagal memuat data");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", medicineData.name);
    formData.append("category", medicineData.category);
    formData.append("unit", medicineData.unit);
    formData.append("price", String(medicineData.price || 0));

    if (medicineData.imageFile)
      formData.append("image", medicineData.imageFile);

    try {
      const res = await fetch(`/api/medicines/${id}`, {
        method: "PUT",
        body: formData,
      });

      const req = await res.json();
      if (!res.ok) throw new Error(req.message || "Gagal update data obat");

      toast.success(req.message);
      router.push("/dashboard/obat");
    } catch (error) {
      toast.error("Gagal update data obat");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMedicineData();
  }, [id]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-3xl border border-gray-200 flex flex-col gap-2 "
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        <InputText
          label="Nama Obat"
          id="name"
          value={medicineData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <SelectInput
          label="Kategori"
          id="category"
          value={medicineData.category}
          options={kategoriOptionsDummy}
          onChange={(e) => handleChange("category", e.target.value)}
        />
        <InputText
          label="Harga"
          id="price"
          value={medicineData.price ?? ""}
          onChange={(e) => handleChange("price", e.target.value)}
        />
        <SelectInput
          label="Satuan"
          id="unit"
          value={medicineData.unit}
          options={unitOption}
          onChange={(e) => handleChange("unit", e.target.value)}
        />
        <InputImagePreview
          label="Gambar"
          id="image"
          image={medicineData.imageFile || medicineData.imagePath}
          setImage={(file: File | null) => handleChange("imageFile", file)}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`mt-4 py-2 px-4 bg-primary text-white rounded-lg w-full md:w-fit shadow-md transition-all ${
          loading ? "opacity-70 cursor-not-allowed" : "hover:scale-95"
        }`}
      >
        {loading ? "Menyimpan..." : "Simpan Obat"}
      </button>
    </form>
  );
}
