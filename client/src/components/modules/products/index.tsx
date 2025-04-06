import ProductCard from "@/components/ui/core/ProductCard";
import { IProducts } from "@/type/products";
import FilterSidebar from "./filterSlider";


const AllProducts = ({ products }: { products: IProducts[] }) => {
  return (
    <div className="flex gap-8 my-10">
      <div className="w-full max-w-sm">
        <FilterSidebar />
      </div>
      <div>
        <div className="grid grid-cols-3 gap-8">
          {products?.map((product: IProducts, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;