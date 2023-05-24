import { Bard } from "googlebard";
import { IBot } from "./IBot";

export class BotGoogleBard implements IBot {
  private bard: Bard;

  constructor() {
    this.bard = new Bard(
      `__Secure-1PSID=${process.env.NEXT_PUBLIC_GOOGLE_APPLICATION_CREDENTIALS}`,
      {
        proxy: {
          host: "162.212.155.148",
          port: 8080,
          protocol: "http",
        },
      }
    );
  }

  async ask(message: string) {
    const response = await this.bard.ask(message);

    return response;
  }
}
