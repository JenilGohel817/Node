import { configureStore } from "@reduxjs/toolkit";
import reduxSlice from "./reduxSlice";

const store = configureStore({
  reducer: {
    users: reduxSlice,
  },
});

export default store;
