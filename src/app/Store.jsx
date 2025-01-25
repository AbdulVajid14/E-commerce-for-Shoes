import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import adminReducer from '../slice/adminSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
  },
  
});

export default store;
