
import FlashSale from "@/components/modules/flaseSale";
import FeaturedProducts from "@/components/modules/home/featureProduct";
import TopBrands from "@/components/modules/home/TopBrands";
import HeroSection from "@/components/modules/HomeSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />

      <FeaturedProducts />
      <FlashSale />
      <TopBrands />
    </div>
  );
};

export default HomePage;
