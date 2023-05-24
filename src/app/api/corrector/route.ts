import { MessageType } from "@/components/MessageTypeButton";
import { BotGoogleBard } from "@/lib/BotGoogleBard";
// import { ChatGPT3 } from "@/lib/ChatGPT3";
import { Bot } from "@/lib/bot";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message, messageType } = (await request.json()) as {
      message: string;
      messageType: MessageType;
    };

    const bot = new Bot(new BotGoogleBard());
    // const bot = new Bot(new ChatGPT3());

    const prefix = "You are an English teacher.";
    let finalMessage = "";

    switch (messageType) {
      case "correct":
        finalMessage = `${prefix} Correct the following sentence: "${message}"`;
        break;
      case "synonyms":
        finalMessage = `${prefix} Tell me synonyms of the word "${message}"`;
        break;
      case "to pt-br":
        finalMessage = `${prefix} Translate the following sentence from English to pt-br: ${message}`;
        break;
      case "to en":
        finalMessage = `${prefix} Translate the following sentence from pt-br to English: ${message}`;
        break;
    }

    const response = await bot.ask(finalMessage);

    return NextResponse.json(response);
  } catch (e) {
    console.error({ e });
    return NextResponse.json(e, { status: 400 });
  }
}
