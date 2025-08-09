import { title } from "process";
import React, { Children } from "react";

export interface ModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  title: string;
  children: React.ReactNode;
}

export interface ModalTambahStokProps {
  isOpen: boolean;
  onCloseAction: () => void;
  onSubmitAction: (quantity: number, action: string, note: string) => void;
}

export interface ModalTambahRekapitulasiProps {
  isOpen: boolean;
  onCloseAction: () => void;
  onSubmitAction: (periode: string) => void;
}
