export type Platform = "windows" | "playstation" | "xbox" | "nintendo";

export type Game = {
  id: number;
  title: string;
  slug: string;
  price: number;
  coverImage: string;
  description: string;
  platform: Platform[];
  genre: string;
  rating: number;
  screenshots: string[];
  trailer: string | null;
  releaseDate: string;
};