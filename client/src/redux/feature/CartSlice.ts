import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IProducts } from "@/type/products";

export interface CartProduct extends IProducts {
  orderQuantity: number;
}

interface InitialState {
  products: CartProduct[];
  city: string;
  shippingAddress: string;
}

const initialState: InitialState = {
  products: [],
  city: "",
  shippingAddress: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const productToAdd = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (productToAdd) {
        productToAdd.orderQuantity += 1;
        return;
      }

      state.products.push({ ...action.payload, orderQuantity: 1 });
    },
    incrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find(
        (product) => product._id === action.payload
      );

      if (productToIncrement) {
        productToIncrement.orderQuantity += 1;
      }
    },
    decrementOrderQuantity: (state, action) => {
      const productToDecrement = state.products.find(
        (product) => product._id === action.payload
      );

      if (productToDecrement && productToDecrement.orderQuantity > 1) {
        productToDecrement.orderQuantity -= 1;
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    updateCity: (state, action) => {
      state.city = action.payload;
    },
    updateShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    clearCart: (state) => {
      state.products = [];
      state.city = "";
      state.shippingAddress = "";
    },
  },
});

//* Selectors
export const orderedProductsSelector = (state: RootState) => state.cart.products;

export const subTotalSelector = (state: RootState) =>
  state.cart.products.reduce((acc, product) => {
    return acc + (product.offerPrice ?? product.price) * product.orderQuantity;
  }, 0);

export const shippingCostSelector = (state: RootState) => {
  if (state.cart.city === "Dhaka" && state.cart.products.length > 0) {
    return 60;
  } else if (state.cart.city && state.cart.products.length > 0) {
    return 120;
  } else {
    return 0;
  }
};

export const grandTotalSelector = createSelector(
  [subTotalSelector, shippingCostSelector],
  (subTotal, shippingCost) => subTotal + shippingCost
);

//* Memoized Order Selector
const cartState = (state: RootState) => state.cart;

export const orderSelector = createSelector(
  [cartState, subTotalSelector, shippingCostSelector],
  (cart, subTotal, shippingCost) => ({
    products: cart.products.map((product) => ({
      product: product._id,
      quantity: product.orderQuantity,
      color: "White",
    })),
    shippingAddress: `${cart.shippingAddress} - ${cart.city}`,
    paymentMethod: "Online",
    totalAmount: subTotal + shippingCost,
    status: "Pending",
    createdAt: new Date().toISOString(),
  })
);

export const citySelector = (state: RootState) => state.cart.city;
export const shippingAddressSelector = (state: RootState) => state.cart.shippingAddress;

export const {
  addProduct,
  incrementOrderQuantity,
  decrementOrderQuantity,
  removeProduct,
  updateCity,
  updateShippingAddress,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
