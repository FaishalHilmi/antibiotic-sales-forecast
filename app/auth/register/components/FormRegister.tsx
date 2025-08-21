"use client";

import InputText from "@/components/InputText";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormRegister() {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [role, setRole] = useState<string>("Apoteker");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Fungsi validasi username
  const isValidUsername = (username: string): boolean => {
    const regex = /^[a-z0-9_]+$/;
    return (
      username.length >= 3 && username.length <= 20 && regex.test(username)
    );
  };

  const handleRegister = async (e: React.FormEvent) => {
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
      const form = new FormData();

      form.append("name", name);
      form.append("username", username);
      form.append("password", password);
      form.append("role", role);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: form,
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        setLoading(false);
        setName("");
        setUsername("");
        setPassword("");
        setTimeout(() => setMessage(""), 5000);

        return;
      }

      setName("");
      setUsername("");
      setPassword("");

      router.push("/auth/login");
    } catch (error: any) {
      setMessage(error.message);
      router.refresh();
    }
  };

  return (
    <form className="text-black" onSubmit={handleRegister}>
      <div className="mb-2">
        <InputText
          label="Nama"
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className="mb-2">
        <InputText
          label="Username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <div className="mb-2">
        <InputText
          label="Password"
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div className="mb-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="role" className="text-black">
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={role}
            className="border border-gray-300 rounded-lg py-1.5 px-3 outline-primary"
            disabled
          />
        </div>
      </div>
      <button
        type="submit"
        className="text-white bg-primary font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-2"
        disabled={loading}
      >
        {loading ? "Loading..." : "Submit"}
      </button>
      {message && <p className="text-center text-sm text-red-500">{message}</p>}
      <div className="text-sm text-center text-black mt-2">
        <span>
          Sudah memiliki akun?{" "}
          <Link href="/auth/login" className="text-primary underline">
            Login disini!
          </Link>
        </span>
      </div>
    </form>
  );
}
