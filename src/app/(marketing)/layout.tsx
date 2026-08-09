import React from "react";
import Header from "@/components/layout/Header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/*Header*/}
      <Header />
      <main className="grow min-h-screen">
        {children}
      </main>
      {/*Footer*/}
      {/*BackToTop*/}
    </>
  );
}