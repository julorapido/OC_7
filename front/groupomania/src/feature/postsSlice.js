import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: null,
    },
    reducers: {
        setPostsData: (state, {payload}) => {
            state.posts = payload;
        },
        addPost: (state, {payload}) => {
            state.posts.push(payload);
        }
    }
})
export const {setPostsData, addPost} = postsSlice.actions;
export default postsSlice.reducer;
