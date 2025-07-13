import { Medicine, MedicineWithImage } from "@/types/medicine";

export const dummyObat: Medicine[] = [
  { id: 1, name: "Paracetamol", price: 5000, stocks: 50, category: "Tablet" },
  { id: 2, name: "Amoxicillin", price: 8000, stocks: 30, category: "Kapsul" },
  { id: 3, name: "Vitamin C", price: 4000, stocks: 80, category: "Tablet" },
];

export const dummyObatDetail: MedicineWithImage = {
  id: 1,
  name: "Paracetamol",
  price: 5000,
  stocks: 50,
  category: "Tablet",
  image: "/medicine.png",
};
