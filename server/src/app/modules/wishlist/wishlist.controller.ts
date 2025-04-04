import { Request, Response } from "express";

import { WishlistService } from "./wishlist.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

export const addToWishlist = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { productId } = req.body;

  const result = await WishlistService.addToWishlist(userId, productId);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Added to wishlist",
    data: result,
  });
});

export const getMyWishlist = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  const result = await WishlistService.getMyWishlist(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Fetched wishlist",
    data: result,
  });
});

export const removeFromWishlist = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { productId } = req.params;

  const result = await WishlistService.removeFromWishlist(userId, productId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Removed from wishlist",
    data: result,
  });
});
