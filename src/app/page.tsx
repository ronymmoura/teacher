import { PastWord } from "@/components/PastWord";
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
    <div className="flex h-screen flex-col px-3">
      {/* Header */}
      <WordForm />

      {/* Main List */}
      <div className="flex flex-col space-y-5 overflow-y-auto py-5 pr-5 scrollbar">
        {todayWords.map((word) => (
          <TodayWord key={word.id} word={word} />
        ))}

        <hr className="border-slate-700" />

        {pastWords.map((word) => (
          <PastWord key={word.id} word={word} />
        ))}
      </div>
    </div>
  );
}
