import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useParams } from 'react-router';
import { backendURL } from "./AuthDoctor";
import axios from 'axios';
import { message } from 'antd';


const initialState = {
    docDetails: {
        first_name: "",
        last_name: "",
        email: "",
        phone_no: "",
        password: "",
        confirm_password: "",
        gender: "",
        role: "",
        dob: "",
        language: "",
        specialization: "",
        about: "",
        hospital_name: "",
        hospital_address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
    },
    isLoading: false
}
export const config = {
    headers: {
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json',
    },
}


export const getDocDetails = createAsyncThunk("DocEditProfile/getDocDetails", async (id, thunkAPI) => {
    try {
        // const id = localStorage.getItem('user_id');
        // console.log("Getting id is " + id)
        console.log("edit id api is-", id);
        axios.get(`${backendURL}/users/${id}`, config)

            .then((res) => {
                thunkAPI.dispatch(getEditProfile(res.data.data))
            })
            .catch((err) => {
                console.log(err)
            });
    }
    catch (err) {
        console.log(err)
    }
})


export const updateDocEditProfile = createAsyncThunk("DocEditProfile/update", async (data, thunkAPI) => {
    try {
        const docAlldet = {
            user: {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone_no: data.phone_no,
                gender: data.gender,
                role: data.role,
                dob: data.dob,
            },
            doctor_info: {
                language: data.language.join(','),
                specialization: data.specialization,
                about: data.about,
                charges: data.charges,
            },
            hospital_info: {
                name: data.hospital_name,
                address: data.hospital_address,
                city: data.city,
                state: data.state,
                // country: data.country,
                pincode: data.pincode,
            }
        }
        const id = data.id;
        console.log(docAlldet)
        axios.patch(`${backendURL}/users/${id}`, docAlldet, config)
            .then((res) => {
                if (res.data.status === 200) {
                    console.log("In patch response is-----", res.data)
                    const updateEdit_message = res.data;
                    // console.log(login_success)
                    message.success(updateEdit_message.message)
                    thunkAPI.dispatch(updateEditprofile(res.data))
                }
                if (res.data.status === 400) {
                    const errorMessage = res.data.message;
                    message.error(errorMessage);
                    message.duration(7);
                    return thunkAPI.rejectWithValue(errorMessage);
                }
            })
            .catch((err) => {
                console.log(err)
                return thunkAPI.rejectWithValue(err.response.data.message)
            })
    }
    catch (err) {
        console.log(err)
    }
})

export const editProfile = createSlice({
    name: "DocEditProfile",
    initialState,
    reducers: {
        getEditProfile: (state, action) => {
            state.docDetails = action.payload;
        },
        updateEditprofile: (state, action) => {
            state.docDetails = action.payload;
        }
    },
    extraReducers: (builder) => {

        builder
            .addCase(getDocDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDocDetails.fulfilled, (state, action) => {
                state.docDetails = action.payload;
                state.isLoading = false;
            })
            .addCase(getDocDetails.rejected, (state, action) => {
                state.isLoading = false;
            })
    }
})

export const { getEditProfile, updateEditprofile } = editProfile.actions;
export default editProfile.reducer;