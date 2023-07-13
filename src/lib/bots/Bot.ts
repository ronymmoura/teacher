import { IBot } from "./IBot";

export class Bot {
  // eslint-disable-next-line no-useless-constructor
  constructor(private bot: IBot) {}

  ask(message: string) {
    return this.bot.ask(message);
  }
}
