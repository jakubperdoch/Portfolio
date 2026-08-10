import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen grow">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
