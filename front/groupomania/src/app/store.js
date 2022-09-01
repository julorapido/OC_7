import {configureStore} from '@reduxjs/toolkit';

import postsReducer from "../feature/postsSlice";
import commentsReducer from "../feature/commentSlice";
const store = configureStore({
    reducer: {
        posts : postsReducer,
        comments: commentsReducer
    }
});

export default store;