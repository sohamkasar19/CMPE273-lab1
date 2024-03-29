import {
  ADD_TO_CART,
  REMOVE_ITEM,
  CHECKOUT_CART,
  CHANGE_CURRENCY,
} from "./action-types/cart-actions";

//add cart action
export const addToCart = (item, quantity) => {
  return {
    type: ADD_TO_CART,
    item,
    quantity,
  };
};

export const changeCurrency = (currency) => {
  return {
    type: CHANGE_CURRENCY,
    currency
  };
};

export const checkoutCart = () => {
  return {
    type: CHECKOUT_CART,
  };
};
//remove item action
export const removeItem = (id) => {
  return {
    type: REMOVE_ITEM,
    id,
  };
};
