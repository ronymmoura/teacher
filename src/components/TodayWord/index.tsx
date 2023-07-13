"use client";

import { Word } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaImage, FaTrash, FaChevronDown } from "react-icons/fa6";

export function TodayWord({ word }: { word: Word }) {
  const router = useRouter();

  async function handleDelete() {
    await axios.delete(`/api/word/${word.id}`);
    router.refresh();
  }

  return (
    <div className="flex cursor-pointer rounded-lg bg-primary px-5 py-3 pl-10 transition-transform hover:scale-100">
      <div className="flex flex-1 flex-col">
        <div className="text-3xl font-bold drop-shadow">{word.word}</div>
        <div className="text-2xl drop-shadow">{word.translation}</div>
      </div>

      <div className="flex items-center space-x-3">
        <button className="flex h-fit flex-col items-center justify-center space-y-1 rounded-md bg-emerald-400 p-2 shadow-md transition-colors hover:bg-emerald-500">
          <FaImage size={20} />
        </button>

        <button
          onClick={handleDelete}
          className="flex h-fit flex-col items-center justify-center space-y-1 rounded-md bg-red-500 p-2 shadow-md transition-colors hover:bg-red-600"
        >
          <FaTrash size={20} />
        </button>

        <button className="flex h-fit flex-col items-center justify-center space-y-1 p-2 drop-shadow-md">
          <FaChevronDown size={20} />
        </button>
      </div>
    </div>
  );
}
