import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"


// Define a type for the slice state
interface CartState {
    quantity: number
}

// Define the initial state using that type
const initialState: CartState = {
    quantity: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        incrementQuantity: (state) => {
            state.quantity += 1
        },
        decrementQuantity: (state) => {
            state.quantity -= 1
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmountQuantity: (state, action: PayloadAction<number>) => {
            state.quantity += action.payload
        },
    },
})

export const { incrementQuantity, decrementQuantity, incrementByAmountQuantity } = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCartQuantity = (state: RootState) => state.cart.quantity

export default cartSlice.reducer;