import "./globals.css";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";

// import { Toaster } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/sonner";

import { CartProvider } from "./[slug]/menu/contexts/cart";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FSW BK",
  description: "Esse eu finalizo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Toaster
          position="bottom-center"
          toastOptions={{ duration: 3000 }}
          richColors
        />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
