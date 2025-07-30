import React from "react";
import FormRegister from "./components/FormRegister";

export default function RegisterPage() {
  return (
    <div className="login-wrapper h-screen flex justify-center items-center bg-base">
      <div className="form-wrapper w-full p-4 md:p-0">
        <div className="max-w-sm mx-auto p-5 rounded-xl bg-white border border-gray-200">
          <h1 className="font-bold text-3xl text-black mb-1">Register</h1>
          <span className="block mb-6 text-primary">
            Silahkan register terlebih dahulu
          </span>
          <FormRegister />
        </div>
      </div>
    </div>
  );
}
