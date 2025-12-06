import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    category:[],
    error:null,
    loading:false
}

const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addCategory.pending,(state)=>{
            state.pending=true;
        })
        .addCase(addCategory.fulfilled,(state,action)=>{
            state.pending=false;
            state.category.push(action.payload);
        })
        .addCase(addCategory.rejected,(state,action)=>{
            state.pending=false;
            state.error = action.payload;
        })
        .addCase(fetchCategoryList.pending,(state)=>{
            state.pending=true;
        })
        .addCase(fetchCategoryList.fulfilled,(state,action)=>{
            state.pending=false;
            state.category = action.payload;
        })
        .addCase(fetchCategoryList.rejected,(state,action)=>{
            state.pending=false;
            state.error = action.payload;
        })
        .addCase(editCategory.pending,(state)=>{
            state.pending=true;
        })
        .addCase(editCategory.fulfilled,(state,action)=>{
            state.pending=false;
            const index = state.category.findIndex(ele=>ele.id===action.payload.id);
            if(index!==-1){
                const data = {...action.payload.data,id:action.payload.id}
                state.category[index] = data;
            }
        })
        .addCase(editCategory.rejected,(state,action)=>{
            state.pending=false;
            state.error = action.payload;
        })  
        .addCase(deleteCategory.pending,(state)=>{
            state.pending=true;
        })
        .addCase(deleteCategory.fulfilled,(state,action)=>{
            state.pending=false;
            state.category = state.category.filter(ele=>ele.id!==action.payload);
        })
        .addCase(deleteCategory.rejected,(state,action)=>{
            state.pending=false;
            state.error = action.payload;
        })        
        
    }
})

export const fetchCategoryList = createAsyncThunk(
    "category/fetchCategoryList",async(_,thunkAPI)=>{
        try{
            const res = await axios.get("https://travel-booking-website-11848-default-rtdb.firebaseio.com/category.json");
            const categoryList = Object.keys(res.data).map(ele=>{
                return {id:ele,...res.data[ele]}
            });
            return categoryList;
        }catch(err){
            return thunkAPI.rejectWithValue("Failed to fetch Category");
        }
    }
)

export const addCategory = createAsyncThunk(
    "category/addCategory",async(category,thunkAPI)=>{
        try{
            const res= await axios.post("https://travel-booking-website-11848-default-rtdb.firebaseio.com/category.json",category);
            return {...category,id:res.data.name}

        }catch(err){
            return thunkAPI.rejectWithValue("Failed to Add Category");
        }


    }
)
export const editCategory=createAsyncThunk(
    "category/editCategory",async({id,data},thunkAPI)=>{
        try{
            await axios.patch(`https://travel-booking-website-11848-default-rtdb.firebaseio.com/category/${id}.json`,data)
            return {id,data};
        }catch(err){
            return thunkAPI.rejectWithValue("Failed to delete the category");
        }
    }
)
export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",async(id,thunkAPI)=>{
        try{
            await axios.delete(`https://travel-booking-website-11848-default-rtdb.firebaseio.com/category/${id}.json`)
            return id;
        }catch(err){
            return thunkAPI.rejectWithValue("Failed to delete the category");
        }
    }
)

export default categorySlice.reducer;