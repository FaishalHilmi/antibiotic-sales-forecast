"use client";

import InputImagePreview from "@/components/InputImagePreview";
import InputText from "@/components/InputText";
import { isValidUsername } from "@/utils/validUsername";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DetailKasirView() {
  const params = useParams();
  const router = useRouter();
  const cashierAccountId = params.id;

  const [loading, setLoading] = useState<boolean>(false);
  const [cashierData, setCashierData] = useState({
    name: "",
    username: "",
    role: "",
    password: "",
    imageFile: null as File | null,
    imagePath: "",
  });

  const handleChange = (key: keyof typeof cashierData, value: any) => {
    setCashierData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getDetailCashier = async () => {
    try {
      const res = await fetch(`/api/account/cashier/${cashierAccountId}`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Gagal fetching API");
      }

      const req = await res.json();
      const cashierAccount = req.payload;

      setCashierData({
        name: cashierAccount.name,
        username: cashierAccount.username,
        role: "Kasir",
        password: "",
        imageFile: null,
        imagePath: cashierAccount.imagePath,
      });
    } catch (error) {
      toast.error("Gagal memuat data");
    }
  };

  useEffect(() => {
    getDetailCashier();
  }, [cashierAccountId]);

  const handleSubmitCashierAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validasi sebelum submit
    if (!isValidUsername(cashierData.username)) {
      toast.error(
        "Username hanya boleh huruf kecil, angka, tanpa spasi, dan panjang 3–20 karakter."
      );
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", cashierData.name);
      formData.append("username", cashierData.username);
      formData.append("role", cashierData.role);
      formData.append("password", cashierData.password);
      if (cashierData.imageFile)
        formData.append("image", cashierData.imageFile);

      const res = await fetch(`/api/account/cashier/${cashierAccountId}`, {
        method: "PUT",
        body: formData,
      });

      const req = await res.json();
      if (!res.ok) throw new Error(req.message || "Gagal update data obat");

      toast.success(req.message);
      router.push("/dashboard/kelola-kasir");
    } catch (error) {
      toast.error("Gagal update data obat");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmitCashierAccount}
      className="bg-white p-6 rounded-3xl border border-gray-200 flex flex-col gap-2 "
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        <InputText
          label="Nama Pengguna"
          id="name"
          value={cashierData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <InputText
          label="Username"
          id="username"
          value={cashierData.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />
        <div className="flex flex-col gap-1">
          <label htmlFor="role" className="text-black">
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={cashierData.role}
            onChange={(e) => handleChange("role", e.target.value)}
            className="border border-gray-300 rounded-lg py-1.5 px-3 outline-primary"
            disabled
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-black">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={cashierData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="border border-gray-300 rounded-lg py-1.5 px-3 outline-primary"
          />
        </div>
        <InputImagePreview
          label="Gambar"
          id="gambar"
          image={cashierData.imageFile || cashierData.imagePath}
          setImage={(file: File | null) => handleChange("imageFile", file)}
        />
      </div>
      <button
        type="submit"
        className={`mt-4 py-2 px-4 bg-primary text-white rounded-lg w-full md:w-fit hover:scale-95 transition-all shadow-md ${
          loading ? "opacity-70 cursor-not-allowed" : "hover:scale-95"
        }`}
      >
        {loading ? "Menyimpan..." : "Simpan Akun"}
      </button>
    </form>
  );
}
