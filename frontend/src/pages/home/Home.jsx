import HeroCarousel from "./HeroCarousel";
import FAQAccordion from "./FAQAccordion";
import Categories from "./Categories";
import HeroSection from "./HeroSection";
import TrendingProducts from "../shop/TrendingProducts";
import DealsSection from "./DealsSection";
import PromoBanner from "./PromoBanner";
import Blogs from "../blog/Blogs";

const Home = () => {
  return (
    <>
      <HeroCarousel />
      <Categories />
      <HeroSection />
      <TrendingProducts />
      <DealsSection />
      <PromoBanner />
      <Blogs />
      <FAQAccordion />
    </>
  );
};

export default Home;
