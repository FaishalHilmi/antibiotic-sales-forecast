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
