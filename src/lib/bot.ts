import { IBot } from "./IBot";

export class Bot {
  constructor(private bot: IBot) {}

  ask(message: string) {
    return this.bot.ask(message);
  }
}
