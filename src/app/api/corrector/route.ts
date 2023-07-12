// import { BotGoogleBard } from "@/lib/BotGoogleBard";
import { MessageType } from "@/components/TeacherChat";
import { ChatGPT3 } from "@/lib/ChatGPT3";
import { Bot } from "@/lib/bot";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message, messageType } = (await request.json()) as {
      message: string;
      messageType: MessageType;
    };

    // const bot = new Bot(new BotGoogleBard());
    const bot = new Bot(new ChatGPT3());

    const prefix = "You are an English teacher.";
    let finalMessage = "";

    switch (messageType) {
      case "correct":
        finalMessage = `${prefix} Correct the following sentence and explain what's wrong: "${message}"`;
        break;
      case "synonyms":
        finalMessage = `${prefix} Tell me synonyms of the word "${message}"`;
        break;
      case "to pt-br":
        finalMessage = `${prefix} Translate the following sentence from English to Brazilian Portuguese and give me synonyms: ${message}`;
        break;
      case "to en":
        finalMessage = `${prefix} Translate the following sentence from Brazilian Portuguese to English and give me synonyms: ${message}`;
        break;
    }

    const response = await bot.ask(finalMessage);

    return NextResponse.json(response);
  } catch (e) {
    console.error({ e });
    return NextResponse.json(e, { status: 400 });
  }
}
