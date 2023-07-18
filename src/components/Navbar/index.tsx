"use client";

import Link from "next/link";
import { FaBookAtlas, FaHouse, FaMessage } from "react-icons/fa6";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { twMerge } from "tailwind-merge";

export function Navbar() {
  return (
    <nav className="hidden h-screen w-full p-3 pr-0 md:flex md:min-w-[350px] md:max-w-[350px]">
      <div className="flex w-full flex-col space-y-5 rounded-xl border border-slate-800 bg-zinc-900 bg-opacity-50 shadow-md shadow-black">
        {/* Logo */}
        <div className="flex items-center space-x-3 p-5">
          <div className="rounded-full">
            <FaBookAtlas className="text-primary" size={40} />
          </div>
          <div className="font-alt text-3xl font-extrabold">Teacher</div>
        </div>

        {/* Menu */}
        <div className="flex-1 px-2 py-16">
          <Link
            href="/"
            className="flex items-center space-x-3 rounded-md p-3 shadow-black transition-colors hover:bg-slate-800 hover:shadow-md"
          >
            <div className="rounded-full bg-primary p-2">
              <FaHouse size={20} />
            </div>
            <div>Home</div>
          </Link>

          <Link
            href="/chat"
            className="flex items-center space-x-3 rounded-md p-3 shadow-black transition-colors hover:bg-slate-800 hover:shadow-md"
          >
            <div className="rounded-full bg-primary p-2">
              <FaMessage size={20} />
            </div>
            <div>Chat</div>
          </Link>
        </div>

        <div className="p-5">
          <div className="flex items-center space-x-3 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 shadow-md shadow-black">
            <AvatarPrimitive.Root className="relative inline-flex h-10 w-10">
              <AvatarPrimitive.Image
                src={"https://github.com/ronymmoura.png"}
                alt="Avatar"
                className="h-full w-full rounded-full bg-primary object-cover shadow shadow-black"
              />
              <AvatarPrimitive.Fallback
                className={twMerge(
                  "flex h-full w-full items-center justify-center rounded-full bg-gray-700"
                )}
              >
                <span className="bg-gray-700 text-sm font-medium  text-gray-200 shadow-black">
                  You
                </span>
              </AvatarPrimitive.Fallback>
            </AvatarPrimitive.Root>

            <div className="flex flex-1 flex-col rounded-md p-2 text-gray-200">
              <span className="text-lg">Rony Moura</span>
              <Link
                href="/logout"
                className="text-sm text-primary hover:underline"
              >
                Sair
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
