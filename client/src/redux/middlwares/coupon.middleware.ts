import { Store, Dispatch, Action } from "@reduxjs/toolkit";
import {
  addProduct,
  decrementOrderQuantity,

  incrementOrderQuantity,
  removeProduct,
  subTotalSelector,
} from "../feature/CartSlice";
import { RootState } from "../store";

export const couponMiddleware =
  (store: Store) => (next: Dispatch) => (action: Action) => {
    if (
      action.type === addProduct.type ||
      action.type === incrementOrderQuantity.type ||
      action.type === decrementOrderQuantity.type ||
      action.type === removeProduct.type
    ) {
      const state: RootState = store.getState();
      const subTotal = subTotalSelector(state);
    }
    return next(action);
  };