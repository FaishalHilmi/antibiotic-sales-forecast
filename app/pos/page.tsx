"use client";

import Modal from "@/components/Modal";
import { CartItem } from "@/types/cart";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";

export default function POSPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Contoh data dummy
  const cartItems: CartItem[] = [
    { name: "Paracetamol", price: 5000, qty: 2 },
    { name: "Amoxicillin", price: 8000, qty: 1 },
  ];

  const totalPayment = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div>
      {/* POS Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
        {/* Menu Section */}
        <div className="menu-section col-span-1 md:col-span-2">
          <div className="heading-search-bar-section flex flex-col md:flex-row justify-between gap-2 mb-8 md:mb-7">
            <h1 className="font-bold text-lg md:text-2xl">Daftar Menu Obat</h1>
            <input
              type="text"
              placeholder="Cari nama obat..."
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-gray-300"
            />
          </div>
          <div className="card-wrapper grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="card col-span-1 p-2 bg-white rounded-xl">
              <img
                src="/medicine.png"
                alt="Product Image"
                className="rounded-t-lg"
              />
              <div className="card-footer flex flex-col gap-2 md:gap-3 mt-2">
                <p className="font-bold md:text-xl m-0">Paracetamol</p>
                <div className="card-description flex flex-col md:flex-row justify-between gap-1 md:gap-0 -mt-2">
                  <span className="price font-medium text-gray-400 text-sm">
                    Rp 5.000
                  </span>
                  <span className="stock font-semibold text-primary text-sm">
                    Stok: 50
                  </span>
                </div>
                <button className="text-white text-sm font-medium w-full py-2 bg-primary-dark rounded-lg">
                  Tambah
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Transaksi */}
        <div className="detail-section bg-white border border-gray-200 col-span-1 p-4 md:p-7 rounded-2xl">
          <h3 className="font-bold text-2xl mb-3">Detail Transaksi</h3>
          <div className="card-list-section">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="card-list flex items-center gap-3 border-b-2 border-gray-200 py-4"
              >
                <img
                  src="/medicine.png"
                  alt="Image Product"
                  className="w-20 h-20 rounded-xl"
                />
                <div className="card-list-description w-full">
                  <span className="font-bold mb-1 block">{item.name}</span>
                  <div className="card-list-action flex flex-col gap-3">
                    <span className="text-sm text-gray-400 font-medium">
                      Rp {item.price.toLocaleString()}
                    </span>
                    <div className="flex justify-between w-full">
                      <div className="card-list-left-section flex gap-4 items-center">
                        <button className="p-1 rounded-md bg-gray-200 text-center">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold">{item.qty}</span>
                        <button className="p-1 rounded-md bg-primary text-center text-white">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="card-list-right-section hidden md:block">
                        <span className="text-sm font-bold">
                          Rp {(item.price * item.qty).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="total-price-section">
            <div className="total-price-wrapper flex justify-between pt-3 mb-3">
              <span className="font-semibold text-sm md:text-lg">
                Total Pembayaran
              </span>
              <span className="font-bold text-sm md:text-lg">
                Rp {totalPayment.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary-dark text-sm md:text-base text-white font-medium w-full py-2 rounded-lg"
            >
              Lanjutkan Pembayaran
            </button>
          </div>
        </div>
      </div>

      {/* Modal Responsive */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Detail Pembayaran"
      >
        {/* List Item */}
        <div className="flex flex-col gap-3 mb-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between text-sm sm:text-base"
            >
              <span className="text-black">
                {item.name} x {item.qty}
              </span>
              <span className="text-black">
                Rp {(item.price * item.qty).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between font-semibold text-md md:text-lg mb-4">
          <span>Total</span>
          <span>Rp {totalPayment.toLocaleString()}</span>
        </div>

        {/* Metode Pembayaran */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Pilih Pembayaran</label>
          <select className="border border-gray-300 rounded-lg p-2 w-full text-sm">
            <option>Cash</option>
            <option>QRIS</option>
          </select>
        </div>

        {/* Bayar Button */}
        <button className="bg-primary-dark text-white font-medium w-full py-2 rounded-lg">
          Bayar Sekarang
        </button>
      </Modal>
    </div>
  );
}
