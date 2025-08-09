export interface Medicine {
  id: number;
  name: string;
  price: number;
  stocks: number;
  category: string;
}

export interface MedicineWithImage extends Medicine {
  image: string;
}

export interface MedicineState {
  id: number;
  name: string;
  imagePath: string;
  category: string;
  price: string;
  unit: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface MedicineProps {
  medicines: MedicineState;
}
