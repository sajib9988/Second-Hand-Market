import ManageCategories from "@/components/modules/shop/category";
import { getAllCategories } from "@/service/category";


const ProductCategoryPage = async () => {
  const { data, meta } = await getAllCategories();
  return (
    <div>
      <ManageCategories categories={data} />
      
       <h1>ProductCategoryPage</h1>
    </div>
  );
};

export default ProductCategoryPage;