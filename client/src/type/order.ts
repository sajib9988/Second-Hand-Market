export interface IOrder {
    products: IOrderProduct[];
    coupon?: string;
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