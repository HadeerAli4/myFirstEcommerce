import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const CartSlice = createSlice({
     name: "cart",
    initialState: {
        items:[],
        totalAmount: 0,
},
reducers:{
addToCart:(state, action) => {
    const product =action.payload;
    //check stock
    if(product.stock <= 0){
        return toast.error("product is out of Stock");
    }
//check product exsists or not 

const item = state.items.find((item) => item.id == product.id);

if(item){
    if(item.quantity >= product.stock){
        return toast.error("product is out of Stock");
    }
    item.quantity += 1;
}else{
    product.quantity = 1;
    state.items.push(product);
}

CartSlice.caseReducers.totalAmount(state);

toast.success("product added to Cart ");
},

removeFromCart: (state,action) =>{
    const product = action.payload;

    state.items = state.items.filter((item) => item.id !== product.id);

    CartSlice.caseReducers.totalAmount(state);

    toast.success(" Product removed from Cart");
},

increaseQty: (state,action) =>{
        const product = action.payload;
        const item = state.items.find((item) => item.id == product.id);

        if (item.quantity >= product.stock){
         toast.error("Product is out of Stock ");
        return;
        }
        item.quantity += 1;

    CartSlice.caseReducers.totalAmount(state);
    },


decreaseQty: (state, action) =>{
        const product = action.payload;
        const item = state.items.find((item) => item.id == product.id)
        if (item.quantity <= 1 ){
             toast.error("Quantitiy can`t be less than 1 ");
        return;
        }
        item.quantity -= 1;

        CartSlice.caseReducers.totalAmount(state);
},

clearCart: (state) => {
    state.items = [];
    state.totalAmount = 0;
},
totalAmount: (state) => {
state.totalAmount = state.items.reduce(
        (sum, item) => sum + (item.price * item.quantity), 0);
},
},
});

export const {
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    totalAmount,
} =CartSlice.actions;

export default CartSlice.reducer;