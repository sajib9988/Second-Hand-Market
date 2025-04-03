// Add this to your type/order.ts file or where your interfaces are defined
export interface IOrder {
    products: {
      product: string;
      quantity: number;
      color: string;
    }[];
    shippingAddress: string;
    paymentMethod: string;
    totalAmount: number;
    status: string;
    createdAt: string;
  }

export interface IOrderProduct {
    product: {
        name: string;
        _id: string;
    };
    quantity: number;
    color: string;
}