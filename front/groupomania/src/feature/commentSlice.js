import { createSlice } from "@reduxjs/toolkit";

export const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        comments: [],
    },
    reducers: {
        setComments: (state, {payload}) => {
            state.comments.unshift(payload);
        },
        addComment: (state, {payload}) => {
            state.comments.splice(0, 0, payload);
        }
    }
})
export const {setComments, addComment} = commentsSlice.actions;
export default commentsSlice.reducer;
