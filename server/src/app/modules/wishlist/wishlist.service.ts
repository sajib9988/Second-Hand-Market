import { Wishlist } from "./wishlist.model";

const addToWishlist = async (userId: string, productId: string) => {
  const alreadyExists = await Wishlist.findOne({ user: userId, product: productId });
  if (alreadyExists) {
    throw new Error("Already in wishlist");
  }

  return await Wishlist.create({ user: userId, product: productId });
};

const getMyWishlist = async (userId: string) => {
  return await Wishlist.find({ user: userId }).populate("product");
};

const removeFromWishlist = async (userId: string, productId: string) => {
  return await Wishlist.findOneAndDelete({ user: userId, product: productId });
};

export const WishlistService = {
  addToWishlist,
  getMyWishlist,
  removeFromWishlist,
};
