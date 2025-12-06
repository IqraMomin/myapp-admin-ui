import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import adminHotelReducer from "./adminHotelSlice";
import categoryReducer from "./categorySlice";
import bookingHistoryReducer from "./bookingHistorySlice";

const store = configureStore({
    reducer:{
        auth:authReducer,
        adminHotels:adminHotelReducer,
        category:categoryReducer,
        bookingHistory:bookingHistoryReducer
    }
})

export default store;