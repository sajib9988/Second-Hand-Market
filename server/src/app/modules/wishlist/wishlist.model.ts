import { Schema, model } from "mongoose";
import { IWishlist } from "./wishlist.interface";

const wishlistSchema = new Schema<IWishlist>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

export const Wishlist = model<IWishlist>("Wishlist", wishlistSchema);
