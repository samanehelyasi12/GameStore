import HeroSlider from "@/components/home/HeroSlider";
import NewGamesSection from "@/components/home/NewGamesSection";
import DiscountPromoSection from "@/components/home/DiscountPromoSection";
import BestSellersSection from "@/components/home/BestSellersSection/BestSellersSection";
import ConsolesSection from "@/components/home/ConsolesSection/ConsolesSection";
import ControllersSection from "@/components/home/ControllersSection/ControllersSection";
import UsedConsolesSection from "@/components/home/UsedConsolesSection/UsedConsolesSection";
import ArticlesSection from "@/components/home/ArticlesSection/ArticlesSection";
import AboutSection from "@/components/home/AboutSection/AboutSection";
import TrailersSection from "@/components/home/TrailersSection/TrailersSection";
import FaqSection from "@/components/home/FaqSection/FaqSection";
import { CategorySlider } from "@/components/home/CategorySlider";
import HeroPickerSection from "@/components/home/HeroPickerSection/HeroPickerSection";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <CategorySlider />
      <NewGamesSection />
      <DiscountPromoSection />
      <BestSellersSection />
      <ConsolesSection />
      <ControllersSection />
      <ArticlesSection />
      <UsedConsolesSection />
      <AboutSection />
      <TrailersSection />
      <HeroPickerSection />
      <FaqSection />
    </>
  );
}