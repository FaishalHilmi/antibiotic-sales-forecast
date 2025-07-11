"use client";

import InputImagePreview from "@/components/InputImagePreview";
import InputText from "@/components/InputText";
import SelectInput from "@/components/SelectInput";
import { kategoriOptionsDummy } from "@/data/kategoriOptionsDummy";
import React, { useEffect, useState } from "react";

export default function EditObatForm() {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lakukan proses submit ke backend di sini
    console.log({ name, price, category, image });
  };

  useEffect(() => {
    console.log({ name, category, price, image });
  }, [name, category, price, image]);

  return (
    <form
      onSubmit={handleSubmit}
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
          options={kategoriOptionsDummy}
          onChange={(e) => setCategory(e.target.value)}
        />
        <InputText
          label="Harga"
          id="harga"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
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
