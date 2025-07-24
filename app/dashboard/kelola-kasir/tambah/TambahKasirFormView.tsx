"use client";

import InputImagePreview from "@/components/InputImagePreview";
import InputText from "@/components/InputText";
// import { dummyDataCashier } from "@/data/kasir";
import { useState } from "react";

export default function TambahKasirFormView() {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");

  return (
    <form
      //   onSubmit={handle}
      className="bg-white p-6 rounded-3xl border border-gray-200 flex flex-col gap-2 "
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        <InputText
          label="Nama Pengguna"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputText
          label="Username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputText
          label="Role"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <InputText
          type="password"
          label="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        Simpan Akun
      </button>
    </form>
  );
}
