import { Bot } from "@/lib/bots/Bot";
import { ChatGPT3 } from "@/lib/bots/ChatGPT3";
import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { id, word } = (await request.json()) as any;

    const bot = new Bot(new ChatGPT3());

    let translation = await bot.ask(
      `Translate the word "${word}" to pt-br in few words`
    );

    translation = translation.replace(/"/g, "");

    await prisma.word.upsert({
      where: { id: id ?? "" },
      create: {
        word,
        translation,
      },
      update: {
        word,
        translation,
      },
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json(e.message, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, word, translation } = (await request.json()) as any;

    await prisma.word.update({
      where: { id },
      data: {
        word,
        translation,
      },
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json(e.message, { status: 400 });
  }
}
