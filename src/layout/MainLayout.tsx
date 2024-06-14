import React from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: "400" });

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return <main className={poppins.className}>{children}</main>;
}
