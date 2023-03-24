import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./Slices/todoSlice";
const store = configureStore({
    reducer:{
        todo:TodoSlice.reducer
    }
})
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch