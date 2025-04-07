import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/core/ProductCard";
import { getAllProducts } from "@/service/product";
import { IProducts } from "@/type/products";

import Link from "next/link";

const FeaturedProducts = async () => {
  const { data: products } = await getAllProducts();

  return (
    <div className="bg-white bg-opacity-50 py-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl">Featured Products</h2>
          <Link href="/products">
            <Button variant="outline" className="rounded-full">
              All Collection
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-8 my-5">
        {products?.map((product: IProducts, idx: number) => (
  <ProductCard key={idx} product={product} />
))}

        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;