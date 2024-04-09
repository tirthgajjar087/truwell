import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useParams } from 'react-router';
import { backendURL } from "./AuthDoctor";
import axios from 'axios';

const initialState = {
    docDetails: {
        first_name: "",
        last_name: "",
        email: "",
        phone_no: "",
        password: "",
        confirm_password: "",
    }
}



export const getDocDetails = createAsyncThunk("DocEditProfile/getDocDetails", async (data, thunkAPI) => {
    try {
        // const id = localStorage.getItem('user_id');
        // console.log("Getting id is " + id)
        const id = useParams().id;
        console.log("Getting id is ", id)

        axios.get(`${backendURL}/users/${id}`)
            .then((res) => {
                console.log(res.data)
                thunkAPI.dispatch(getEditProfile(res.data))
            })
            .catch((err) => {
                console.log(err)
            });
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
        }
    }
})

export const { getEditProfile, updateEditprofile } = editProfile.actions;
export default editProfile.reducer;