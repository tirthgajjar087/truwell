import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendURL } from "./AuthDoctor";
import { message } from "antd";
import { handleApiError } from "./AuthDoctor";


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

    await axios.get(`${backendURL}/prescriptions`, config).then((res) => {
        console.log("In Prescption api -:", res.data.data);

        let data = [];
        for (let index = 0; index < res.data.data.length; index++) {
            const element = res.data.data[index];
            const { prescription, patient_name } = element
            for (let j = 0; j < prescription.length; j++) {
                let pres = prescription[j];
                data.push({
                    ...pres,
                    patient_name
                })
            }
        }

        console.log('data=>', data)
        thunkAPI.dispatch(getAllprescription(data));
        // if (res.data.status === 200) {
        //     message.success({
        //         content: res.data.message,
        //         duration: 7
        //     });
        // }
        handleApiError(res.data);
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
        instructions: prescription.instructions,
    }
    console.log("No data", prescriptionData);
    await axios.post(`${backendURL}/prescriptions`, prescriptionData, {
        headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json',
            'AUTH_TOKEN': `${localStorage.getItem('token')}`
        }
    })
        .then((res) => {
            console.log("In prescption api--", res.data);
            if (res.data.status === 200) {
                thunkAPI.dispatch(addPrescription(res.data.data));
                message.success({
                    content: res.data.message,
                    duration: 7
                });
            }
            handleApiError(res.data);
        })
})


export const EditPrescriptionApi = createAsyncThunk("myprescription/EditPrescriptionApi", async (prescription, thunkAPI) => {

    console.log(thunkAPI.getState());
    console.log("Edit Prescription", prescription);
    let prescData = thunkAPI.getState().myprescription.prescriptions;
    let appointment_id = prescData.id;

    const prescriptionData = {
        update_prescription: {
            title: prescription.title,
            dosage: prescription.dosage,
            quantity: prescription.quantity,
            medicine: prescription.medicine,
        },
        instructions: prescription.instructions,
    }
    // console.log("No data", prescriptionData);

    await axios.patch(`${backendURL}/prescriptions/${appointment_id}`, prescriptionData, {
        headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json',
            'AUTH_TOKEN': `${localStorage.getItem('token')}`
        }
    })
        .then((res) => {
            console.log("In prescption api--", res.data);
            if (res.data.status === 200) {
                thunkAPI.dispatch(EditPrescription(res.data.data));
                message.success({
                    content: res.data.message,
                    duration: 7
                });
            }
            handleApiError(res.data);
        })
})
export const DeletePrescriptionApi = createAsyncThunk("myprescription/DeletePrescriptionApi", async (prescription, thunkAPI) => {

    console.log(thunkAPI.getState());
    console.log("Edit Prescription", prescription);
    let prescData = thunkAPI.getState().myprescription.prescriptions;
    let appointment_id = prescData.id;


    await axios.delete(`${backendURL}/prescriptions/${appointment_id}`, {
        headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json',
            'AUTH_TOKEN': `${localStorage.getItem('token')}`
        }
    })
        .then((res) => {
            console.log("In prescption api--", res.data);
            if (res.data.status === 200) {
                thunkAPI.dispatch(deletePrescription(res.data.data));
                message.success({
                    content: res.data.message,
                    duration: 7
                });
            }
            handleApiError(res.data);
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
        },
        getAllprescription: (state, action) => {
            state.getPres = action.payload;
            console.log('action.payload', action.payload)
        },
        EditPrescription: (state, action) => {
            state.prescriptions = {
                ...state.prescriptions,
                ...action.payload
            }

        },
        deletePrescription: (state, action) => {
            state.prescriptions = {
                ...state.prescriptions,
                ...action.payload
            }
        }
    }
})

export const { addPrescription, getAllprescription, EditPrescription, deletePrescription } = docPrescription.actions;
export default docPrescription.reducer;