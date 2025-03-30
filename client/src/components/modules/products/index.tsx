import ProductCard from "@/components/ui/core/ProductCard";
import FilterSidebar from "./filterSlider";
import { IProducts } from "@/type/products";


const AllProducts = ({ products }: { products: IProducts[] }) => {
  return (
    <div className="flex gap-8 my-10">
      <div>
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
