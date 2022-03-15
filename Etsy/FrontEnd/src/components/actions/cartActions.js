import { ADD_TO_CART,REMOVE_ITEM} from './action-types/cart-actions'

//add cart action
export const addToCart= (item, quantity)=>{
    return{
        type: ADD_TO_CART,
        item,
        quantity
    }
}
//remove item action
export const removeItem=(id)=>{
    return{
        type: REMOVE_ITEM,
        id
    }
}