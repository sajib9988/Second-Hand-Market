import ManageBrands from "@/components/modules/shop/brand";
import { getAllBrands } from "@/service/brand";


const ProductBrandPage = async () => {
  const { data, meta } = await getAllBrands();
  return (
    <div>
      <ManageBrands brands={data} />
      <h1>ProductBrandPage</h1>
    </div>
  );
};

export default ProductBrandPage;