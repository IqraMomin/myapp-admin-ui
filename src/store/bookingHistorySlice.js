import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState={
    bookings:[],
    loading:false,
    error:null
}

const bookingHistorySlice = createSlice({
    name:"bookingHistory",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchBookings.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchBookings.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload;
        })
        .addCase(fetchBookings.fulfilled,(state,action)=>{
            state.loading=false;
            state.bookings = action.payload;
        })
        .addCase(updateStatus.pending,(state)=>{
            state.loading=true;
        })
        .addCase(updateStatus.fulfilled,(state,action)=>{
            state.loading=false;
            const {bookingId,status} = action.payload;
            const booking = state.bookings.find(ele=>ele.bookingId===bookingId);
            if(booking){
                booking.status = status;
            }
        })
        .addCase(updateStatus.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload;
        })
        
        
        
    }
})

export const fetchBookings = createAsyncThunk(
    "bookingHistory/fetchBookings",async(_,thunkAPI)=>{
        try{
            const res = await axios.get(`https://travel-booking-website-11848-default-rtdb.firebaseio.com/bookings.json`);
            
      const data = res.data;

      if (!data) return [];

      let bookingList = [];

      // Loop through each user email
      Object.keys(data).forEach(userEmail => {
        const userBookings = data[userEmail];

        // Loop through each booking under that user
        Object.keys(userBookings).forEach(bookingId => {
          bookingList.push({
            bookingId,
            ...userBookings[bookingId]
          });
        });
      });
      return bookingList;

        }catch(err){
            return thunkAPI.rejectWithValue("Failed to fetch bookings");
        }
    }
)
export const updateStatus = createAsyncThunk(
    "bookingHistory/updateStatus",async({email,bookingId,status,hotelData},thunkAPI)=>{
        try{
            const safeEmail = email.replace(/[.]/g,"_");
            await axios.patch(`https://travel-booking-website-11848-default-rtdb.firebaseio.com/bookings/${safeEmail}/${bookingId}.json`,{status})
            if(status==="accepted"){
                await axios.post(`https://travel-booking-website-11848-default-rtdb.firebaseio.com/cart/${safeEmail}.json`,hotelData)
            }
            return {bookingId,status}
        }catch(err){
            return thunkAPI.rejectWithValue("Failed to update Status");
        }
    }
)

export default bookingHistorySlice.reducer;