import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useParams } from 'react-router';
import { backendURL, logout } from "./AuthDoctor";
import axios from 'axios';
import { message } from 'antd';
import { handleApiError } from "./AuthDoctor";

const initialState = {
    docDetails: {},
    isLoading: false
}
export const config = {
    headers: {
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json',
        'AUTH_TOKEN': `${localStorage.getItem('token')}`
    },
}


export const getDocDetails = createAsyncThunk("DocEditProfile/getDocDetails", async (id, thunkAPI) => {
    try {
        // const id = localStorage.getItem('user_id');
        // console.log("Getting id is " + id)
        console.log("edit id api is-", id);
        axios.get(`${backendURL}/users/${id}`, config)
            .then((res) => {
                console.log("My response in user details is==:", res.data);
                thunkAPI.dispatch(getEditProfile(res.data.data))
                // if (res.data.status === 440) {
                //     message.error(res.data.message);
                //     localStorage.removeItem('token');
                //     localStorage.removeItem('user_id');
                //     localStorage.removeItem('activeKey');
                //     thunkAPI.dispatch(logout(res.data));
                // }
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

        console.log("API Update data is ", data)
        console.log("Your image Update data is ", data.selectedImage)
        console.log("Your name Update data is ", data.selectedImage.name)
        console.log("Your size Update data is ", data.selectedImage.size)
        console.log("Your type Update data is ", data.selectedImage.type)
        const docAlldet = {
            user: {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone_no: data.phone_no,
                gender: data.gender,
                role: data.role,
                dob: data.dob,
                // profile_pic_file_name: data.selectedImage.name,
                // profile_pic_file_size: data.selectedImage.size,
                // profile_pic_content_type: data.selectedImage.type,
                // profile_pic_updated_at: data.selectedImage.lastModifiedDate,
                // profile_data_url:data.file.url,
                // profile_data_thumb_url:data.file.thumb_url,
            },
            doctor_info: {
                language: data.language.join(','),
                specialization: data.specialization.join(','),
                charges: data.charges,
                about: data.about,
            },
            hospital_info: {
                name: data.hospital_name,
                address: data.hospital_address,
                city: data.city,
                state: data.state,
                // country: data.country,
                pincode: data.pincode,
            },
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
                handleApiError(res.data);
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