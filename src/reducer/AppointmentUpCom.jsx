import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from 'antd';
import { backendURL } from "./AuthDoctor";
import axios from 'axios';
import { handleApiError } from "./AuthDoctor";

const initialState = {
    upcomingPatientDet: [],
    compPatientDet: [],
    isLoading: false,
    setMedicalHistory: {
        name: "",
        data: [],
    }
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
            handleApiError(res.data);
        })
    }
    catch (err) {
        console.log(err)
    }
})


export const getMedicalHistoryApi = createAsyncThunk("fetchAppointment/getMedicalHistoryApi", async (app_id, thunkAPI) => {
    console.log("My appointment--", app_id)

    await axios.get(`${backendURL}/medical_histories`, {
        params: {
            appointment_id: app_id
        },
        headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json',
            'AUTH_TOKEN': `${localStorage.getItem('token')}`
        }
    }).then((res) => {
        console.log("In Medical History api -:", res.data.data);

        if (res.data.status === 200) {
            thunkAPI.dispatch(getMedicalHistory(res.data));
        }
        handleApiError(res.data);
    })
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
            handleApiError(res.data);
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
        },
        getMedicalHistory: (state, action) => {
            console.log('action.payload', action.payload)
            state.setMedicalHistory = {
                name: action.payload.name,
                data: action.payload.data
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(Upcompatientdet.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(Upcompatientdet.fulfilled, (state, action) => {
                state.isLoading = false;
            })
    }
})


export const { getUpcomingAppointment, getCompeletedAppointment, getMedicalHistory } = fetchAppointment.actions;
export default fetchAppointment.reducer;