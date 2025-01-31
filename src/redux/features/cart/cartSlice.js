import { createSlice } from "@reduxjs/toolkit"
import Swal from "sweetalert2";


//defining the initial state for the actions to be performed 
const initialState = {
    cartItems: [],

}

const cartSlice = createSlice({
    name: 'cart',
    initialState:initialState,
    // in this reducers we will have actions 
    reducers: {
        //addToCart is one of the action to be performed to add the items to the cart
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if(!existingItem)
            {
                state.cartItems.push(action.payload);
                // alert("Item is added successfully!");
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product added to the cart!",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            else
            {
                // alert("Item is already exists in the cart!");
                Swal.fire({
                    title: "Already added to the cart",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "OK!"
                  });
            }
        },
        removeFromCart:(state,action)=>{
            state.cartItems=state.cartItems.filter(item=>item._id!=action.payload._id)
        },
        clearCart:(state)=>{
            state.cartItems=[];
        }
    }
})

//then we need to export the actions
export const {addToCart,removeFromCart,clearCart}=cartSlice.actions;
export default cartSlice.reducer;
