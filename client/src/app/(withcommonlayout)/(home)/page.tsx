
import FlashSale from "@/components/modules/flaseSale";
import Category from "@/components/modules/home/category";
import FeaturedProducts from "@/components/modules/home/featureProduct";
import TopBrands from "@/components/modules/home/TopBrands";
import HeroSection from "@/components/modules/HomeSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Category />
      <FeaturedProducts />
      <FlashSale />
      <TopBrands />
    </div>
  );
};

export default HomePage;
