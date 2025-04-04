"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const addToWishlist = async (productId: string): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/wishlist/create-wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify({ productId }),
    });
    revalidateTag("wishlist"); // Add this to refresh the wishlist
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// getMyWishlist.ts
export const getMyWishlist = async (): Promise<any> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/wishlist`, {
    method: "GET",
    headers: {
      Authorization: (await cookies()).get("accessToken")!.value,
    },
    next: { tags: ["wishlist"] }, // ✅ Tag added
  });

  return res.json();
};

export const removeFromWishlist = async (productId: string): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/wishlist/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("wishlist"); // ✅ cache invalidated
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
