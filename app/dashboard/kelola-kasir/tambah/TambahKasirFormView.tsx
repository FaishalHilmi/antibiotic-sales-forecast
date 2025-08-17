"use client";

import InputImagePreview from "@/components/InputImagePreview";
import InputText from "@/components/InputText";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function TambahKasirFormView() {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [role, setRole] = useState<string>("Kasir");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Fungsi validasi username
  const isValidUsername = (username: string): boolean => {
    const regex = /^[a-z0-9_]+$/;
    return (
      username.length >= 3 && username.length <= 20 && regex.test(username)
    );
  };

  const handleAddCashier = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validasi sebelum submit
    if (!isValidUsername(username)) {
      setMessage(
        "Username hanya boleh huruf kecil, angka, tanpa spasi, dan panjang 3–20 karakter."
      );
      setLoading(false);
      setTimeout(() => setMessage(""), 5000);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("role", role);
      if (image) {
        formData.append("image", image);
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        setLoading(false);
        setName("");
        setUsername("");
        setPassword("");
        setImage(null);

        return;
      }

      setName("");
      setUsername("");
      setPassword("");
      setImage(null);

      toast.success(data.message);

      router.push("/dashboard/kelola-kasir");
    } catch (error) {
      throw new Error("Gagal memuat data");
    }
  };

  return (
    <form
      onSubmit={handleAddCashier}
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
        <div className="flex flex-col gap-1">
          <label htmlFor="role" className="text-black">
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border border-gray-300 rounded-lg py-1.5 px-3 outline-primary"
            disabled
          />
        </div>
        <InputText
          type="password"
          label="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        {loading ? "Loading..." : "Simpan Akun"}
      </button>
      {message && <p className="text-center text-sm text-red-500">{message}</p>}
    </form>
  );
}
