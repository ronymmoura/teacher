import { Bard } from "googlebard";
import { IBot } from "./IBot";

export class BotGoogleBard implements IBot {
  private bard: Bard;

  constructor() {
    this.bard = new Bard(
      `__Secure-1PSID=${process.env.NEXT_PUBLIC_GOOGLE_APPLICATION_CREDENTIALS}`
    );
  }

  async ask(message: string) {
    const response = await this.bard.ask(message);
    // console.log({ response });
    return response;
  }

  async ask2(message: string) {
    const BARD_URL =
      "https://bard.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate";
    const Secure1PSID = process.env.NEXT_PUBLIC_GOOGLE_APPLICATION_CREDENTIALS;
    const AT_KEY = process.env.NEXT_PUBLIC_AT_KEY!;
    const PROMPT = message;

    const params = new URLSearchParams({
      bl: "boq_assistant-bard-web-server_20230419.00_p1",
      _reqid: Math.random().toString().slice(2, 8),
      rt: "c",
    });

    const messageRequest = [[PROMPT], null, ["", "", ""]];

    const headers = new Headers();
    headers.append("X-Same-Domain", "1");
    headers.append(
      "User-Agent",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
    );
    headers.append(
      "Content-Type",
      "application/x-www-form-urlencoded;charset=UTF-8"
    );
    headers.append("Sec-Fetch-Site", "same-origin");
    headers.append("Sec-Fetch-Mode", "cors");
    headers.append("Sec-Fetch-Dest", "empty");
    headers.append("Cookie", `__Secure-1PSID=${Secure1PSID};`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("at", AT_KEY);
    urlencoded.append(
      "f.req",
      JSON.stringify([null, JSON.stringify(messageRequest)])
    );

    const requestOptions = {
      method: "POST",
      headers,
      body: urlencoded,
    };

    const request = await fetch(`${BARD_URL}?${params}`, requestOptions);
    const response = await request.text();
    console.log({ response });

    return response;
  }
}
