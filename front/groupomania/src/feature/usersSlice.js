import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: null,
    },
    reducers:{
        setUsersData: (state, payload)=>{
            state.users = payload;
        }
    }
})