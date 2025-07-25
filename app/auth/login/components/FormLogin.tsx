"use client";

import InputText from "@/components/InputText";
import { useState } from "react";

export default function FormLogin() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <form className="text-black">
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
      {/* {message && <p className="text-center text-red-500">{message}</p>} */}
    </form>
  );
}
