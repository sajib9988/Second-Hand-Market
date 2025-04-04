"use server";

import { cookies } from "next/headers";


export const createWishList = async (): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/wishlist/create-wishlist`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};




export const getMyWishlist = async (): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/wishlist`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      cache: "no-store",
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};



export const removeFromWishlist = async (productId: string): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/wishlist/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
