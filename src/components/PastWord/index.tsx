"use client";

import { Word } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaImage,
  FaTrash,
  FaChevronDown,
  FaPencil,
  FaXmark,
  FaFloppyDisk,
} from "react-icons/fa6";

export function PastWord({ word }: { word: Word }) {
  const router = useRouter();

  const [Editing, setEditing] = useState(false);
  const [Word, setWord] = useState(word.word);
  const [Translation, setTranslation] = useState(word.translation);

  async function handleDelete() {
    await axios.delete(`/api/word/${word.id}`);
    router.refresh();
  }

  async function handleEdit() {
    setEditing(true);
  }

  async function handleCancel() {
    setEditing(false);
  }

  async function handleSave() {
    await axios.put("/api/word", {
      id: word.id,
      word: Word,
      translation: Translation,
    });
    setEditing(false);
    router.refresh();
  }

  return (
    <div className="flex cursor-pointer rounded-lg bg-slate-800 bg-opacity-70 px-4 py-2 pl-10 transition-transform hover:scale-100">
      <div className="flex flex-1 flex-col">
        {!Editing && (
          <>
            <div className="font-bold drop-shadow">{word.word}</div>
            <div className="text-sm drop-shadow">{word.translation}</div>
          </>
        )}

        {Editing && (
          <div className="flex flex-col space-y-3 pr-5">
            <input
              className="rounded-md border border-slate-700 bg-transparent px-2 py-1 text-2xl"
              value={Word}
              onChange={(e) => setWord(e.target.value)}
            />
            <input
              className="rounded-md border border-slate-700 bg-transparent px-2 py-1"
              value={Translation}
              onChange={(e) => setTranslation(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="flex items-center space-x-3">
        {!Editing && (
          <>
            <button className="flex h-fit flex-col items-center justify-center space-y-1 rounded-md bg-emerald-400 p-2 shadow-md transition-colors hover:bg-emerald-500">
              <FaImage size={14} />
            </button>

            <button
              onClick={handleEdit}
              className="flex h-fit flex-col items-center justify-center space-y-1 rounded-md bg-cyan-500 p-2 shadow-md transition-colors hover:bg-cyan-600"
            >
              <FaPencil size={14} />
            </button>

            <button
              onClick={handleDelete}
              className="flex h-fit flex-col items-center justify-center space-y-1 rounded-md bg-red-500 p-2 shadow-md transition-colors hover:bg-red-600"
            >
              <FaTrash size={14} />
            </button>
          </>
        )}

        {Editing && (
          <>
            <button
              onClick={handleSave}
              className="flex h-fit flex-col items-center justify-center space-y-1 rounded-md bg-emerald-400 p-2 shadow-md transition-colors hover:bg-emerald-500"
            >
              <FaFloppyDisk size={14} />
            </button>

            <button
              onClick={handleCancel}
              className="flex h-fit flex-col items-center justify-center space-y-1 rounded-md bg-red-500 p-2 shadow-md transition-colors hover:bg-red-600"
            >
              <FaXmark size={14} />
            </button>
          </>
        )}

        <button className="flex h-fit flex-col items-center justify-center space-y-1 p-2 drop-shadow-md">
          <FaChevronDown size={14} />
        </button>
      </div>
    </div>
  );
}
