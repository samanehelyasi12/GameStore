import type { Game } from "@/lib/types/game";

export type CartItem = {
  game: Game;
  quantity: number;
};