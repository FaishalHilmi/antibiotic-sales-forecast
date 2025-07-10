"use client";
import React, { createContext, useState } from "react";
import { SidebarContextType } from "@/types/sidebar";

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  return (
    <SidebarContext.Provider
      value={{ isExpanded, isMobileOpen, toggleSidebar, toggleMobileSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
