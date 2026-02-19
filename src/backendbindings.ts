import { WebUI } from "jsr:@webui/deno-webui";
import { loadBoard } from "./processor.ts";

export function bindAll(win: WebUI): void {
  win.bind("ping", (_e) => {
    return "pong";
  });

  win.bind("getBoard", (_e) => {
    const board = loadBoard();
    return JSON.stringify(board);
  });
}
