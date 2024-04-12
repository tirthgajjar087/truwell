import { duration } from "moment";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    addRota: {
        start_time: "",
        end_time: "",
        for_date: "",
        duration: "",
        price: "",
    }
}



export const createRota = createSlice({
    name: "newRota",
    initialState,
    reducers: {

        setRota: (state, action) => {
            state.addRota = action.payload;
        }
    }

})


export const { setRota } = createRota.actions;
export default createRota.reducer;