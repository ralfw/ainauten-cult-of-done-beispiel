export interface Card {
  title: string;
}

export interface Column {
  name: string;
  cards: Card[];
}

export interface Board {
  columns: Column[];
}

export function loadBoard(): Board {
  const raw = Deno.readTextFileSync(`${import.meta.dirname}/board.json`);
  return JSON.parse(raw) as Board;
}
