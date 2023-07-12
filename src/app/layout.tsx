import { ReactNode } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import { TeacherChat } from "@/components/TeacherChat";

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
        className={`${poppins.variable} flex bg-gray-900 bg-[url(../assets/bg-stars.svg)] bg-repeat font-sans text-gray-100`}
      >
        <nav className="hidden w-full md:flex md:w-[250px]">Nav</nav>

        <main className="flex-1">{children}</main>

        <aside className="border-l border-slate-800 bg-zinc-900 bg-opacity-60 md:w-[400px]">
          <TeacherChat />
        </aside>
      </body>
    </html>
  );
}
