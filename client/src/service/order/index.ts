"use server";

import { cookies } from "next/headers";


export const getMySellOrders = async (): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/my-sell-orders`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
