import { TeacherChat } from "@/components/TeacherChat";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className="flex h-screen w-full p-3">
      <div className="flex w-full flex-col rounded-lg border border-slate-800 bg-zinc-900 bg-opacity-50 shadow-md shadow-black">
        <TeacherChat />
      </div>
    </div>
  );
}
