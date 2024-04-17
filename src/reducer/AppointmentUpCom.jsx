import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from 'antd';
import { backendURL } from "./AuthDoctor";
import axios from 'axios';


const initialState = {
    upcomingPatientDet: [],
    compPatientDet: [],
    isLoading: false,
}

export const Upcompatientdet = createAsyncThunk("fetchAppointment/getpatientdet", async (status, thunkAPI) => {
    try {
        console.log("Patient status: ", status);
        await axios.get(`${backendURL}/appointments`, {
            params: {
                status: "upcoming"
            },
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Content-Type': 'application/json',
                'AUTH_TOKEN': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            console.log("In upcoming data:", res.data);
            // alert('hh')
            thunkAPI.dispatch(getUpcomingAppointment(res.data.data));
            if (res.data.status === 200) {
            }
        })
    }
    catch (err) {
        console.log(err)
    }
})



export const completedpatientdet = createAsyncThunk("fetchAppointment/getpatientdet", async (status, thunkAPI) => {
    try {
        console.log("Patient status: ", status);
        await axios.get(`${backendURL}/appointments`, {
            params: {
                status: "completed"
            },
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Content-Type': 'application/json',
                'AUTH_TOKEN': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            console.log("In upcoming data:", res.data);
            thunkAPI.dispatch(getCompeletedAppointment(res.data.data));
            if (res.data.status === 200) {
            }
        })
    }
    catch (err) {
        console.log(err)
    }
})



export const fetchAppointment = createSlice({
    name: "fetchAppointment",
    initialState,
    reducers: {
        getUpcomingAppointment: (state, action) => {
            state.upcomingPatientDet = action.payload;
            console.log("Appointment Details: ", state.appPatientDet);
        },
        getCompeletedAppointment: (state, action) => {
            state.compPatientDet = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(Upcompatientdet.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(Upcompatientdet.fulfilled, (state, action) => {
                state.isLoading = false;
                // state.upcomingPatientDet = action.payload;
            })
    }
})


export const { getUpcomingAppointment, getCompeletedAppointment } = fetchAppointment.actions;
export default fetchAppointment.reducer;