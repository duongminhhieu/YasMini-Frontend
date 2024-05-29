import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { Cart } from "../../../types/Cart"


// Define a type for the slice state
interface CartState {
    carts: Cart[]
}

// Define the initial state using that type
const initialState: CartState = {
    carts: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setCarts(state, action: PayloadAction<Cart[]>) {
            state.carts = action.payload
        },
        updateACartState(state, action: PayloadAction<Cart>) {
            const index = state.carts.findIndex(cart => cart.id === action.payload.id)
            if (index !== -1) {
                state.carts[index] = action.payload
            }
        }
        ,
        addCart(state, action: PayloadAction<Cart>) {

            // check if cart already exists
            const index = state.carts.findIndex(cart => cart.id === action.payload.id)
            if (index !== -1) {
                state.carts[index] = action.payload
                return
            } else {
                state.carts.push(action.payload)
            }
        },
        deleteACart(state, action: PayloadAction<string[]>) {
            state.carts = state.carts.filter(cart => !action.payload.includes(cart.id))
        }
    },
})

export const { setCarts, addCart, updateACartState, deleteACart } = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCarts = (state: RootState) => state.cart.carts

export default cartSlice.reducer;