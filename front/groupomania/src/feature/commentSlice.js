import { createSlice } from "@reduxjs/toolkit";

export const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        comments: [],
    },
    reducers: {
        setCommentsData: (state, {payload}) => {
            state.comments.push(payload);
        },
        addComment: (state, {payload}) => {
            state.comments.push([payload]);
        }
    }
})
export const {setCommentsData, addComment} = commentsSlice.actions;
export default commentsSlice.reducer;
