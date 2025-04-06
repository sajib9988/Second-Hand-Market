import ManageProducts from "@/components/modules/shop/product"
import { getAllProducts } from "@/service/product";


const ManageListingsPage =async () => {
    const { data, meta } = await getAllProducts();
  return (
    <div> 
  
            <ManageProducts products={data} meta={meta}></ManageProducts>
        
    </div>
  )
}

export default ManageListingsPage