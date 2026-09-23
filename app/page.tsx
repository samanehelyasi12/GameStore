import HeroSlider from "@/components/home/HeroSlider";
import NewGamesSection from "@/components/home/NewGamesSection";
import DiscountPromoSection from "@/components/home/DiscountPromoSection"
import BestSellersSection from "@/components/home/BestSellersSection/BestSellersSection";
import { CategorySlider } from "@/components/home/CategorySlider";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <CategorySlider />
      <NewGamesSection />
      <DiscountPromoSection />
      <BestSellersSection />
    </>
  );
}