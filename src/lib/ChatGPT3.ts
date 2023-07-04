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
    try {
      const response = await this.openAI.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      });

      return response.data.choices[0].message?.content;
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
        return error.response.data;
      } else {
        console.log(error.message);
        return error.message;
      }
    }
  }
}
