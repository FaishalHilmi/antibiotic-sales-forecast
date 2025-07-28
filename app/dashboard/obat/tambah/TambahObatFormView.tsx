"use client";

import InputImagePreview from "@/components/InputImagePreview";
import InputText from "@/components/InputText";
import SelectInput from "@/components/SelectInput";
import { kategoriOptionsDummy } from "@/data/kategoriOptionsDummy";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function TambahObatFormView() {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const router = useRouter();

  // useEffect(() => {
  //   console.log({ name, category, price, image });
  // }, [name, category, price, image]);

  const handleSubmitMedicine = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama_obat", name);
    formData.append("kategori", category);
    formData.append("satuan", unit);
    formData.append("harga", String(price));
    if (image) {
      formData.append("gambar", image);
    }

    await fetch("/api/obat", {
      method: "POST",
      body: formData,
    });

    router.push("/dashboard/obat");
  };

  return (
    <form
      onSubmit={handleSubmitMedicine}
      className="bg-white p-6 rounded-3xl border border-gray-200 flex flex-col gap-2 "
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        <InputText
          label="Nama Obat"
          id="nama_obat"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <SelectInput
          label="Kategori"
          id="kategori"
          value={category}
          options={kategoriOptionsDummy}
          onChange={(e) => setCategory(e.target.value)}
        />
        <InputText
          label="Harga"
          id="harga"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <SelectInput
          label="Satuan"
          id="satuan"
          options={kategoriOptionsDummy}
          onChange={(e) => setUnit(e.target.value)}
        />
        <InputImagePreview
          label="Gambar"
          id="gambar"
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
