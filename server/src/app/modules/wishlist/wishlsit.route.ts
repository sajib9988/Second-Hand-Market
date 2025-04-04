import express from "express";
import { addToWishlist, getMyWishlist, removeFromWishlist } from "./wishlist.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.interface";


const router = express.Router();

router.post("/create-wishlist", auth(UserRole.ADMIN, UserRole.USER), addToWishlist);
router.get("/", auth(UserRole.ADMIN, UserRole.USER), getMyWishlist);
router.delete("/:productId", auth(UserRole.ADMIN, UserRole.USER), removeFromWishlist);

export const WishlistRoutes = router;
