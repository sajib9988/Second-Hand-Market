"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { addProduct } from "@/redux/feature/CartSlice";
import { useAppDispatch } from "@/redux/hook";
import { removeFromWishlist } from "@/service/wishlist";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import Link from "next/link";

const WishlistTable = ({ wishlistData }: any) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartItems = useSelector((state: any) => state.cart.products);

  const handleRemoveFromWishlist = async (id: string) => {
    try {
      setLoading(true);
      await removeFromWishlist(id);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: any) => {
    dispatch(addProduct(product));
  };

  const isInCart = (productId: string) => {
    return cartItems.some((item: any) => item._id === productId);
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wishlistData?.map((item: any) => (
            <TableRow key={item._id}>
              <TableCell>
                <Image
                  src={item.product.imageUrls[0]}
                  alt={item.product.name}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
              </TableCell>
              <TableCell>{item.product.name}</TableCell>
              <TableCell>${item.product.price}</TableCell>
              <TableCell className="flex items-center gap-2 mt-5">
                {isInCart(item.product._id) ? (
                  <Link href="/cart" passHref>
                    <Button size="sm" variant="default">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Go to Cart
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={() => handleAddToCart(item.product)}
                    size="sm"
                    variant="outline"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                )}

                <Button
                  onClick={() => handleRemoveFromWishlist(item.product._id)}
                  size="sm"
                  variant="destructive"
                  disabled={loading}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {wishlistData?.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No items in wishlist
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default WishlistTable;