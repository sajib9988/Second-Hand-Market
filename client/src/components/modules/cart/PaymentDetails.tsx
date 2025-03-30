"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import {
  citySelector,
  clearCart,
  grandTotalSelector,
  orderedProductsSelector,
  orderSelector,
  shippingAddressSelector,
  shippingCostSelector,
  subTotalSelector,
} from "@/redux/feature/CartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { createOrder } from "@/service/cart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PaymentDetails() {
  // Getting necessary values from Redux store
  const Subtotal = useAppSelector(subTotalSelector);
  const shippingCost = useAppSelector(shippingCostSelector);
  const grandTotal = useAppSelector(grandTotalSelector);
  const order = useAppSelector(orderSelector);
  const city = useAppSelector(citySelector);
  const shippingAddress = useAppSelector(shippingAddressSelector);
  const cartProducts = useAppSelector(orderedProductsSelector);

  const user = useUser();
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Function to handle order placement
  const handleOrder = async () => {
    try {
      toast.loading("Order is being placed");

      // Check if user is logged in
      if (!user.user) {
        router.push("/login");
        toast.error("Please login first.");
        return;
      }

      // Check if city and shipping address are selected
      if (!city || !shippingAddress) {
        toast.error("Please select a city and provide a shipping address.");
        return;
      }

      // Ensure cart is not empty before ordering
      if (cartProducts.length === 0) {
        toast.error("Cart is empty! What are you trying to order??");
        return;
      }

      // Call API to create an order
      const res = await createOrder(order);
      console.log(res);

      if (res?.success) {
        toast.success("Order placed successfully!");
        dispatch(clearCart()); // Clear cart after successful order
        router.push(res.data.paymentUrl);
      } else {
        toast.error(res.message || "Something went wrong!");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to place order.");
    }
  };

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4 h-fit p-5">
      <h1 className="text-2xl font-bold">Payment Details</h1>
      <div className="space-y-2 mt-4">
        <div className="flex justify-between">
          <p className="text-gray-500 ">Subtotal</p>
          <p className="font-semibold">৳{Subtotal}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-500 ">Shipment Cost</p>
          <p className="font-semibold">৳{shippingCost}</p>
        </div>
      </div>
      <div className="flex justify-between mt-10 mb-5">
        <p className="text-gray-500 ">Grand Total</p>
        <p className="font-semibold">৳{grandTotal}</p>
      </div>
      <Button
        onClick={handleOrder}
        className="w-full text-xl font-semibold py-5"
      >
        Order Now
      </Button>
    </div>
  );
}
