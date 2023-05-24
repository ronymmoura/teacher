import { Configuration, OpenAIApi } from "openai";
import { IBot } from "./IBot";

export class ChatGPT3 implements IBot {
  private openAI: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
    this.openAI = new OpenAIApi(configuration);
  }

  async ask(message: string) {
    const response = await this.openAI.createCompletion({
      model: "text-davinci-003",
      prompt: message,
    });

    console.log(response.data);

    return response.data.choices[0].text!;
  }
}
