"use client";

import axios from "axios";
import { useState } from "react";
import { FaPlus, FaSpinner } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export function WordForm() {
  const router = useRouter();

  const [Word, setWord] = useState("");
  const [Loading, setLoading] = useState(false);

  async function addWord() {
    try {
      setLoading(true);
      await axios.post("/api/word", { word: Word });
      router.refresh();
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full py-5">
      <input
        value={Word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Type here a word or sentence..."
        className="flex-1 rounded-l-lg border border-slate-700 bg-transparent px-4 py-2 outline-none transition-colors focus:border-slate-500"
      />
      <button
        onClick={addWord}
        className="flex items-center space-x-3 rounded-r-lg bg-primary px-4 py-2 text-white transition-opacity hover:opacity-80"
      >
        {!Loading && (
          <>
            <FaPlus className="drop-shadow" />
            <span className="drop-shadow">Adicionar</span>
          </>
        )}

        {Loading && <FaSpinner className="animate-spin" />}
      </button>
    </div>
  );
}
