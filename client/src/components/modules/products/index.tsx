import ProductCard from "@/components/ui/core/ProductCard";
import { IProducts } from "@/type/products";
import FilterSidebar from "./filterSlider";

const AllProducts = ({ products }: { products: IProducts[] }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 my-10 px-4 md:px-0">
      <div className="w-full md:max-w-sm">
        <FilterSidebar />
      </div>
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {products?.map((product: IProducts, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;