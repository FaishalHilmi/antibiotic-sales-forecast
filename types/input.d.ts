import React from "react";

export interface InputProps {
  label: string;
  id: string;
  type?: string;
  value: string | number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SelectInputProps {
  label: string;
  id: string;
  options: Option[];
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface Option {
  label: string;
  value: string;
}

export interface InputImagePreviewProps {
  label: string;
  id: string;
  image: File | null;
  setImage: (file: File | null) => void;
}
