import { ReactNode } from "react";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";

import { Navbar } from "@/components/Navbar";

import "./globals.css";

const grandiflora = localFont({
  src: "../assets/Grandiflora_One/GrandifloraOne-Regular.ttf",
  display: "swap",
  variable: "--font-grandiflora",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "300", "400", "500", "700"],
});

export const metadata = {
  title: "Teacher",
  description: "Irra!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${
          poppins.variable
        } ${`${grandiflora.variable}`} flex bg-gray-900 bg-[url(../assets/bg-stars.svg)] bg-repeat font-main text-gray-100`}
      >
        <Navbar />

        {children}
      </body>
    </html>
  );
}
