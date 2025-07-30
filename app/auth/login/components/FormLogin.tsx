"use client";

import InputText from "@/components/InputText";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function FormLogin() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const user = session?.user as { role?: string };

    if (user?.role === "CASHIER") {
      router.push("/pos");
    } else if (user?.role === "PHARMACIST") {
      router.push("/dashboard");
    }
  }, [session]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.ok) {
      router.refresh();
    } else {
      setMessage("Email dan Password salah!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <form className="text-black" onSubmit={handleLogin}>
      <div className="mb-2">
        <InputText
          label="Username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <div className="mb-4">
        <InputText
          label="Password"
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <button
        type="submit"
        className="text-white bg-primary font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-2"
      >
        Submit
      </button>
      {message && <p className="text-center text-sm text-red-500">{message}</p>}
    </form>
  );
}
