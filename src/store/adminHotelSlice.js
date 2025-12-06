import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    hotels:[],
    error:null,
    loading:false
}

const adminHotelSlice = createSlice({
    name:"adminHotels",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addHotel.pending,(state)=>{
            state.loading=true;
        })
        .addCase(addHotel.fulfilled,(state,action)=>{
            state.loading=false;
            state.hotels.push(action.payload);
        })
        .addCase(addHotel.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload;
        })
        .addCase(fetchHotelList.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchHotelList.fulfilled,(state,action)=>{
            state.loading=false;
            state.hotels = action.payload;
        })
        .addCase(fetchHotelList.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload;
        })
        .addCase(editHotel.pending,(state)=>{
            state.loading=true;
        })
        .addCase(editHotel.fulfilled,(state,action)=>{
            state.loading=false;
            const index = state.hotels.findIndex(ele=>ele.id===action.payload.id);
            if(index!==-1){
                const data = {...action.payload.data,id:action.payload.id}
                state.hotels[index] = data;
            }
        })
        .addCase(editHotel.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload;
        })  
        .addCase(deleteHotel.pending,(state)=>{
            state.loading=true;
        })
        .addCase(deleteHotel.fulfilled,(state,action)=>{
            state.loading=false;
            state.hotels = state.hotels.filter(ele=>ele.id!==action.payload);
        })
        .addCase(deleteHotel.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload;
        })        
        
    }
})

export const addHotel = createAsyncThunk(
    "adminHotels/addHotel",async(hotel,thunkAPI)=>{
        try{
            const res= await axios.post("https://travel-booking-website-11848-default-rtdb.firebaseio.com/hotels.json",hotel);
            return {...hotel,id:res.data.name}

        }catch(err){
            return thunkAPI.rejectWithValue("Failed to Add Hotel");
        }


    }
)
export const fetchHotelList = createAsyncThunk(
    "adminHotels/fetchHotelList",async(_,thunkAPI)=>{
        try{
            const res = await axios.get("https://travel-booking-website-11848-default-rtdb.firebaseio.com/hotels.json");
            const hotelList = Object.keys(res.data).map(ele=>{
                return {id:ele,...res.data[ele]}
            });
            return hotelList;
        }catch(err){
            return thunkAPI.rejectWithValue("Failed to fetch Hotels");
        }
    }
)
export const editHotel=createAsyncThunk(
    "adminHotels/editHotel",async({id,data},thunkAPI)=>{
        try{
            await axios.patch(`https://travel-booking-website-11848-default-rtdb.firebaseio.com/hotels/${id}.json`,data)
            return {id,data};
        }catch(err){
            return thunkAPI.rejectWithValue("Failed to delete the hotel");
        }
    }
)
export const deleteHotel = createAsyncThunk(
    "adminHotels/deleteHotel",async(id,thunkAPI)=>{
        try{
            await axios.delete(`https://travel-booking-website-11848-default-rtdb.firebaseio.com/hotels/${id}.json`)
            return id;
        }catch(err){
            return thunkAPI.rejectWithValue("Failed to delete the hotel");
        }
    }
)
export default adminHotelSlice.reducer;