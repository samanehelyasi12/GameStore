import Link from "next/link";
import type { Game } from "@/lib/types";

type GameCardProps = {
  game: Game;
};

export default function GameCard({ game }: GameCardProps) {
  return (
    <article>
      <h3>
        <Link href={`/games/${game.slug}`}>{game.title}</Link>
      </h3>
      <p>{game.genre}</p>
    </article>
  );
}