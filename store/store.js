import {configureStore} from "@reduxjs/toolkit";
import {diarySlice} from "@store/diarySlice";

export const store = configureStore({
    reducer: {
        diary: diarySlice.reducer,
    },
});