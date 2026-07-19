import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user:null,
        isLoggedIn: false,
    },
    reducers:{
        saveUser: (state, action) =>{
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        clearUser: (state) =>{
            state.user = null;
            state.isLoggedIn = false;
        },
        registerUserSuccess: (state, action) =>{
            state.user = action.payload;
            state.isLoggedIn = true;

        }
    },
})

export const {saveUser , clearUser ,registerUserSuccess } = userSlice.actions;
export default userSlice.reducer;