import { PastWord } from "@/components/PastWord";
import { TeacherChat } from "@/components/TeacherChat";
import { TodayWord } from "@/components/TodayWord";
import { WordForm } from "@/components/WordForm";
import { prisma } from "@/lib/db/prisma";
import { isSameDay } from "date-fns";

export const dynamic = "force-dynamic";

export default async function Home() {
  const words = await prisma.word.findMany({ orderBy: { updatedAt: "desc" } });

  const todayWords = words.filter((word) =>
    isSameDay(word.updatedAt, new Date())
  );
  const pastWords = words.filter(
    (word) => !isSameDay(word.updatedAt, new Date())
  );

  return (
    <>
      <main className="flex h-screen flex-1 flex-col p-3">
        {/* Header */}
        <WordForm />

        {/* Main List */}
        <div className="flex flex-col space-y-5 overflow-y-auto py-5 scrollbar">
          {todayWords.map((word) => (
            <TodayWord key={word.id} word={word} />
          ))}

          <hr className="border-slate-700" />

          {pastWords.map((word) => (
            <PastWord key={word.id} word={word} />
          ))}
        </div>
      </main>

      <div className="hidden h-screen flex-col border border-slate-800 bg-zinc-900 bg-opacity-50 shadow-md shadow-black md:flex md:w-[400px]">
        <TeacherChat />
      </div>
    </>
  );
}
