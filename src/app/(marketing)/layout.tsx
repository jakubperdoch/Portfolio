import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/*Header*/}
      <Header />
      <main className="min-h-screen grow">{children}</main>
      <Footer />
      {/*BackToTop*/}
    </>
  );
}
