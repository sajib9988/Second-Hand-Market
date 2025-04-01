import ManageProducts from "@/components/modules/shop/product"
import { getAllProducts } from "@/service/product";


const ManageListingsPage =async () => {
    const { data, meta } = await getAllProducts();
  return (
    <div> 
        <h1>
            <ManageProducts products={data} meta={meta}></ManageProducts>
        </h1>
    </div>
  )
}

export default ManageListingsPage