"use client";

import Modal from "@/components/Modal";
import TransactionReceipt from "@/components/TransactionReceipt";
import Image from "next/image";
import { CartItem } from "@/types/cart";
import { MedicineState } from "@/types/medicine";
import { Minus, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { ReceiptData } from "@/types/receipt";
import { formatRupiah } from "@/utils/formatCurrency";

export default function POSPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [medicines, setMedicines] = useState<MedicineState[]>([]);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cartItem");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const getMedicines = async () => {
    try {
      const res = await fetch("/api/medicines", {
        method: "GET",
      });
      const data = await res.json();

      setMedicines(data.payload);
    } catch (error) {
      console.log("Terjadi Kesalahan");
    }
  };

  const filteredMedicine = medicines.filter((medicine) => {
    return medicine.name.toLowerCase().includes(search.toLowerCase());
  });

  const handleAddToCart = (medicine: MedicineState) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.name === medicine.name
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.name === medicine.name ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [
          ...prevItems,
          {
            medicineId: medicine.id,
            name: medicine.name,
            imagePath: medicine.imagePath,
            price: Number(medicine.price),
            qty: 1,
            stock: medicine.stock,
          },
        ];
      }
    });
  };

  const totalPayment = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const handleIncreaseQty = (name: string) => {
    const medicine = medicines.find((med) => med.name === name);
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.name === name && medicine && item.qty < medicine.stock) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      })
    );
  };

  const handleDecreaseQty = (name: string) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.name === name ? { ...item, qty: item.qty - 1 } : item
          )
          .filter((item) => item.qty > 0) // Hapus kalau qty = 0
    );
  };

  const handleRemoveItem = (name: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.name !== name));
  };

  useEffect(() => {
    getMedicines();
  }, [medicines]);

  // Simpan ke localStorage saat cart berubah
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItems));
  }, [cartItems]);

  // Ambil dari localStorage saat halaman dimuat
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItem");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const handlePayment = async () => {
    const payload = cartItems.map((item, index) => ({
      medicineId: item.medicineId,
      quantity: item.qty,
      unitPrice: item.price,
      subtotal: item.price * item.qty,
    }));

    const formData = new FormData();
    formData.append("paymentmethod", paymentMethod);
    formData.append("items", JSON.stringify(payload));

    try {
      const res = await fetch("/api/transaction", {
        method: "POST",
        body: formData,
      });
      const req = await res.json();
      const data = await req.payload;

      setReceiptData(data);

      if (!res.ok) {
        throw new Error("Gagal menyimpan transaksi");
      }

      // // Bersihkan keranjang & localStorage
      setCartItems([]);
      localStorage.removeItem("cartItem");

      // // Tutup modal
      setIsModalOpen(false);

      // (Opsional) Cetak struk
      setTimeout(() => {
        handlePrint();
      }, 300);
    } catch (error) {
      console.error("Error saat melakukan pembayaran:", error);
    }
  };

  const handlePrint = () => window.print();
  return (
    <div>
      {/* POS Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-9 no-print">
        {/* Menu Section */}
        <div className="menu-section col-span-1 md:col-span-2">
          <div className="heading-search-bar-section flex flex-col md:flex-row justify-between gap-2 mb-8 md:mb-7">
            <h1 className="font-bold text-lg md:text-2xl">Daftar Menu Obat</h1>
            <input
              type="text"
              placeholder="Cari nama obat..."
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-gray-300"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="card-wrapper grid grid-cols-2 md:grid-cols-4 gap-2">
            {filteredMedicine.map((medicine, i) => (
              <div className="card col-span-1 p-2 bg-white rounded-xl" key={i}>
                {medicine.imagePath ? (
                  <Image
                    src={medicine.imagePath}
                    alt="Product Image"
                    className="rounded-t-lg h-36 w-full object-fill"
                    width={500}
                    height={100}
                  />
                ) : (
                  <Image
                    src="/blank-image.png"
                    alt="Product Image"
                    className="rounded-t-lg h-36 w-full object-cover"
                    width={500}
                    height={100}
                  />
                )}
                <div className="card-footer flex flex-col gap-2 md:gap-3 mt-2">
                  <p className="font-bold md:text-xl m-0">{medicine.name}</p>
                  <div className="card-description flex flex-col md:flex-row justify-between gap-1 md:gap-0 -mt-2">
                    <span className="price font-medium text-gray-400 text-sm">
                      {formatRupiah(Number(medicine.price))}
                    </span>
                    <span className="stock font-semibold text-primary text-sm">
                      Stok: {medicine.stock}
                    </span>
                  </div>
                  <button
                    className="text-white text-sm font-medium w-full py-2 bg-primary-dark rounded-lg"
                    disabled={
                      medicine.stock <= 0 ||
                      cartItems.some((item) => item.name === medicine.name)
                    }
                    onClick={() => handleAddToCart(medicine)}
                  >
                    Tambah
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Transaksi */}
        <div className="detail-section bg-white border border-gray-200 col-span-1 p-4 md:p-7 rounded-2xl">
          <h3 className="font-bold text-2xl mb-3">Detail Transaksi</h3>
          <div className="card-list-section">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="card-list relative flex items-center gap-3 border-b-2 border-gray-200 py-4"
              >
                <button
                  onClick={() => handleRemoveItem(item.name)}
                  className="absolute top-2 right-2 p-1 rounded-md text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Hapus item"
                >
                  <Trash className="w-5 h-5" />
                </button>
                {item.imagePath ? (
                  <Image
                    src={item.imagePath}
                    alt="Image Product"
                    className="w-20 h-20 rounded-xl object-cover"
                    width={500}
                    height={300}
                  />
                ) : (
                  <Image
                    src="/blank-image.png"
                    alt="Image Product"
                    className="w-20 h-20 rounded-xl object-cover"
                    width={500}
                    height={300}
                  />
                )}
                <div className="card-list-description w-full">
                  <span className="font-bold mb-1 block">{item.name}</span>
                  <div className="card-list-action flex flex-col gap-3">
                    <span className="text-sm text-gray-400 font-medium">
                      Rp {item.price.toLocaleString()}
                    </span>
                    <div className="flex justify-between w-full">
                      <div className="card-list-left-section flex gap-4 items-center">
                        <button
                          onClick={() => handleDecreaseQty(item.name)}
                          className="p-1 rounded-md bg-gray-200 text-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold">{item.qty}</span>
                        <button
                          onClick={() => handleIncreaseQty(item.name)}
                          disabled={item.qty >= item.stock}
                          className="p-1 rounded-md bg-primary text-center text-white"
                        >
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
              disabled={cartItems.length > 0 ? false : true}
            >
              Lanjutkan Pembayaran
            </button>
          </div>
        </div>
      </div>

      {/* Modal Responsive */}
      <Modal
        isOpen={isModalOpen}
        onCloseAction={() => setIsModalOpen(false)}
        title="Detail Pembayaran"
      >
        <form>
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
            <label htmlFor="paymentMethod" className="block mb-2 font-medium">
              Pilih Pembayaran
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full text-sm"
            >
              <option value="cash">Cash</option>
              <option value="qris">QRIS</option>
            </select>
          </div>

          {/* Bayar Button */}
          <button
            type="button"
            onClick={handlePayment}
            className="bg-primary-dark text-white font-medium w-full py-2 rounded-lg"
          >
            Bayar Sekarang
          </button>
        </form>
      </Modal>

      {/* Komponen Struk untuk Cetak */}
      <div className="receipt-print hidden print:block" id="print-area">
        {receiptData && (
          <TransactionReceipt
            transactionId={receiptData.transactionId}
            datetime={receiptData.datetime}
            cashierName={receiptData.cashierName}
            items={receiptData.items.map((item) => ({
              itemName: item.name,
              quantity: item.qty,
              price: parseInt(item.price),
              total: parseInt(item.subtotal),
            }))}
            subTotal={parseInt(receiptData.totalPayment)}
          />
        )}
      </div>
    </div>
  );
}
