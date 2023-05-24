export interface IBot {
  ask: (message: string) => Promise<string>;
}
