"use client";
import React, { createContext, useContext, useState } from "react";

type SidebarContextType = {
  isExpanded: boolean;
  isMobileOpen: boolean;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

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

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context)
    throw new Error("useSidebar must be used within SidebarProvider");
  return context;
};
