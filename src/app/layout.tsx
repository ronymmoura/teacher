import { ReactNode } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";

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
        className={`${poppins.variable} bg-gray-900 bg-[url(../assets/bg-stars.svg)] bg-repeat font-sans text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
