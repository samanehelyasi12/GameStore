import HeroSlider from "@/components/home/HeroSlider";
import NewGamesSection from "@/components/home/NewGamesSection";
import DiscountPromoSection from "@/components/home/DiscountPromoSection"
import BestSellersSection from "@/components/home/BestSellersSection/BestSellersSection";
import ConsolesSection from "@/components/home/ConsolesSection/ConsolesSection";
import UsedConsolesSection from "@/components/home/UsedConsolesSection/UsedConsolesSection";
import ArticlesSection from "@/components/home/ArticlesSection/ArticlesSection";
import AboutSection from "@/components/home/AboutSection/AboutSection";
import { CategorySlider } from "@/components/home/CategorySlider";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <CategorySlider />
      <NewGamesSection />
      <DiscountPromoSection />
      <BestSellersSection />
      <ConsolesSection />
      <ArticlesSection />
      <UsedConsolesSection />
      <AboutSection />
    </>
  );
}