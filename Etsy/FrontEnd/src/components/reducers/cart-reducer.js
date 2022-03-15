import { ADD_TO_CART, REMOVE_ITEM } from "../actions/action-types/cart-actions";

const initState = {
  addedItems: [],
  total: 0,
};
const cartReducer = (state = initState, action) => {
  //INSIDE HOME COMPONENT
  if (action.type === ADD_TO_CART) {
    // let addedItem = state.items.find((item) => item.id === action.id);
    console.log(state);
    let itemToAdd = action.item;
    //check if the action id exists in the addedItems
    let existed_item = state.addedItems.find((item) => item.ItemId === itemToAdd.ItemId);
    let itemPrice = Number(itemToAdd.Price);
    let quantity = Number(action.quantity);
    let totalItemPrice = itemPrice * quantity;
    console.log(itemPrice +" "+ typeof itemPrice);
    if (existed_item) {
      itemToAdd.quantityInCart += quantity;
      // state.addedItems.push(itemToAdd);
      let newTotal = state.total + totalItemPrice;
      return {
        ...state,
        total: newTotal,
      };
    } else {
      itemToAdd.quantityInCart = quantity;
      //calculating the total
      state.addedItems.push(itemToAdd);
      console.log(state);
      let newTotal = state.total + totalItemPrice;
      return {
        ...state,
        // addedItems: [...state.addedItems, itemToAdd],
        total: newTotal,
      };
    }
    
  }
  if (action.type === REMOVE_ITEM) {
    let itemToRemove = state.addedItems.find((item) => action.id === item.id);
    let new_items = state.addedItems.filter((item) => action.id !== item.id);

    //calculating the total
    let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
    
    return {
      ...state,
      addedItems: new_items,
      total: newTotal,
    };
  } 
  else {
    return state;
  }
};

export default cartReducer;
