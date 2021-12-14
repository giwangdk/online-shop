import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState= {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}
const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id)
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1
                toast.info(`Increased ${state.cartItems[itemIndex].name} product quantity`, {
                    position:"bottom-left",
                }
                )
            }else{
                
                const tempProduct = { ...action.payload, cartQuantity: 1 }
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} added to cart`, {
                    position:"bottom-left",
                })
            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        removeFromCart(state, action){
            const nextCartItems = state.cartItems.filter(
                cartItem =>cartItem.id !== action.payload.id
            )

            state.cartItems = nextCartItems
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            toast.error(`${action.payload.name} removed from cart`, {
                position:"bottom-left",
            })
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                cartItem =>cartItem.id === action.payload.id
            )
            if(state.cartItems[itemIndex].cartQuantity > 1){
                state.cartItems[itemIndex].cartQuantity -=1

                toast.info(`Decreased ${action.payload.name} cart quantity`, {
                position:"bottom-left",
            })
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                cartItem =>cartItem.id !== action.payload.id
                )

                state.cartItems = nextCartItems
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
                toast.error(`${action.payload.name} removed from cart`, {
                    position:"bottom-left",
            })
            }
        },
        clearCart(state, action) {
            state.cartItems = []
            toast.error("Cart clear", {
                position:"bottom-left",
            })
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
                
        }
    }
})

export const {addToCart, removeFromCart, decreaseCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;