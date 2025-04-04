import WishlistTable from "@/components/modules/wishlist";
import { getMyWishlist } from "@/service/wishlist";

export default async function WishlistPage() {
  const wishlistData = await getMyWishlist();
  console.log("wishlistData", wishlistData);

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      <WishlistTable wishlistData={wishlistData.data} />
    </div>
  );
}