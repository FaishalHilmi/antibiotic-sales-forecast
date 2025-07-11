import { title } from "process";
import React, { Children } from "react";

export interface ModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  title: string;
  children: React.ReactNode;
}
