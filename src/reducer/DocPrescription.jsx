import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendURL } from "./AuthDoctor";
import { message } from "antd";


const initialState = {
    prescriptions: {},
    getPres: [],
}

export const config = {
    headers: {
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json',
        'AUTH_TOKEN': `${localStorage.getItem('token')}`
    }
}

export const getPrescriptionApi = createAsyncThunk("myprescription/getPrescriptionApi", async (data, thunkAPI) => {

    await axios.get(`${backendURL}/prescriptions`, {
        headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json',
            'AUTH_TOKEN': `${localStorage.getItem('token')}`
        }
    }).then((res) => {
        console.log("In Prescption api -:", res.data.data);
        thunkAPI.dispatch(updateAllprescription(res.data.data));
        if (res.data.status === 200) {
            message.success({
                content: res.data.message,
                duration: 7
            });
        }
        if (res.data.status === 400) {
            const errorMessage = res.data.message;
            message.error({
                content: errorMessage,
                duration: 7
            });
            return thunkAPI.rejectWithValue(errorMessage);
        }
    })
})



export const addPrescriptionApi = createAsyncThunk("myprescription/addPrescriptionApi", async (prescription, thunkAPI) => {

    console.log(thunkAPI.getState());
    console.log("add, addPrescription", prescription);
    let prescData = thunkAPI.getState().myprescription.prescriptions;
    const prescriptionData = {
        prescription: {
            appointment_id: prescData.appointment_id,
            prescription_type: prescription.prescription_type,
            title: prescription.title,
            dosage: prescription.dosage,
            quantity: prescription.quantity,
            medicine: prescription.medicine,
        },
        instructions: prescription.instruction,
    }
    console.log("No data", prescriptionData);
    await axios.post(`${backendURL}/prescriptions`, prescriptionData, config)
        .then((res) => {
            console.log("In prescption api--", res.data);
            if (res.data.status === 200) {
                thunkAPI.dispatch(addPrescription(res.data.data));
                message.success({
                    content: res.data.message,
                    duration: 7
                });
            }
            if (res.data.status === 400) {
                const errorMessage = res.data.message;
                message.error({
                    content: errorMessage,
                    duration: 7
                });
                return thunkAPI.rejectWithValue(errorMessage);
            }

        })
})


export const docPrescription = createSlice({
    name: "myprescription",
    initialState,
    reducers: {
        addPrescription: (state, action) => {
            state.prescriptions = {
                ...state.prescriptions,
                ...action.payload
            }
            // state.prescriptions = action.payload;
            // state.prescriptions.push(action.payload);
        },
        updateAllprescription: (state, action) => {
            state.getPres = action.payload;
            console.log('action.payload', action.payload)
            // console.log('Worked', state.getPres);
        }
    }
})

export const { addPrescription, updateAllprescription } = docPrescription.actions;
export default docPrescription.reducer;