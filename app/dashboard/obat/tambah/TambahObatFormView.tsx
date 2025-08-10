"use client";

import InputImagePreview from "@/components/InputImagePreview";
import InputText from "@/components/InputText";
import SelectInput from "@/components/SelectInput";
import { kategoriOptionsDummy, unitOption } from "@/data/kategoriOptionsDummy";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function TambahObatFormView() {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmitMedicine = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("unit", unit);
      formData.append("price", String(price));
      if (image) {
        formData.append("image", image);
      }

      const res = await fetch("/api/medicines", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        setLoading(false);
        setTimeout(() => setMessage(""), 5000);

        setName("");
        setUnit("");
        setCategory("");
        setPrice(null);
        setImage(null);

        return;
      }

      setName("");
      setUnit("");
      setCategory("");
      setPrice(null);
      setImage(null);

      router.push("/dashboard/obat");
    } catch (error: any) {
      setMessage(error.message);
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSubmitMedicine}
      className="bg-white p-6 rounded-3xl border border-gray-200 flex flex-col gap-2 "
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        <InputText
          label="Nama Obat"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <SelectInput
          label="Kategori"
          id="category"
          value={category}
          options={kategoriOptionsDummy}
          onChange={(e) => setCategory(e.target.value)}
        />
        <InputText
          label="Harga"
          id="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <SelectInput
          label="Satuan"
          id="unit"
          options={unitOption}
          onChange={(e) => setUnit(e.target.value)}
        />
        <InputImagePreview
          label="Gambar"
          id="image"
          image={image}
          setImage={setImage}
        />
      </div>
      <button
        type="submit"
        className="mt-4 py-2 px-4 bg-primary text-white rounded-lg w-full md:w-fit hover:scale-95 transition-all shadow-md"
      >
        Simpan Obat
      </button>
    </form>
  );
}
