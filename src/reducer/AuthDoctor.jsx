import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { message } from 'antd';

// export const backendURL = 'https://5f6f-122-170-10-87.ngrok-free.app';
export const backendURL = 'http://192.168.0.115:3000';

//Handle Api Error
export const handleApiError = (error) => {
    if (error.status === 400) {
        console.log(error);
        message.error(error.message)
    }
}

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token') || false,
    user_id: null,
    loginObj: {
        email: null,
        password: null,
    },
    signupObj: {
        first_name: null,
        last_name: null,
        email: null,
        phone_no: null,
        password: null,
        confirm_password: null,
        loading: false,
        error: null,
    },
}



const config = {
    headers: {
        'Content-Type': 'application/json',
    },
}

//Login APi
export const loginDoctor = createAsyncThunk('auth/loginDoctor', async (data, thunkAPI) => {
    try {
        console.log("In login api data--:", data);
        const checkDoctor = {
            email: data.email,
            password: data.password
        }
        await axios.post(`${backendURL}/users/log_in`, checkDoctor, config)
            .then((res) => {
                if (res.data.status === 200) {
                    console.log("In Login api -:", res)
                    thunkAPI.dispatch(updateLoginObj(res.data));
                    localStorage.setItem('token', res.data.data.token);
                    localStorage.setItem('user_id', res.data.data.user_id);
                    console.log('My data saved', res.data.status);
                    message.success(res.data.message)
                    message.duration(7);
                }
                handleApiError(res.data);

            })
            .catch((error) => {
                console.log(error.response)
                return thunkAPI.rejectWithValue(error.message);

            })

    } catch (error) {
        message.error('An error occurred while logging in. Please try again.');
        return thunkAPI.rejectWithValue(error.message);
    }

})


// SignUp Api
export const addDoctor = createAsyncThunk('auth/addDoctor', async (data, thunkAPI) => {
    try {
        const newDoctor = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone_no: data.phone_no,
            password: data.password,
            confirm_password: data.confirm_password,
            gender: data.gender,
            role: "doctor",
        }
        await axios.post(`${backendURL}/users/sign_up`, newDoctor, config)
            .then((res) => {
                if (res.data.status === 200) {
                    console.log("SignUp api--:", res)
                    thunkAPI.dispatch(updateSignUpObj(res.data))
                    localStorage.setItem('token', res.data.data.token);
                    localStorage.setItem('user_id', res.data.data.id);
                    message.success(res.data.message);
                    message.duration(5);
                }
                handleApiError(res.data);
            })
            .catch((error) => {
                console.log(error)
                return thunkAPI.rejectWithValue(error.message);
            })
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }

});

//Logout API
export const logoutAPi = createAsyncThunk('auth/logoutAPi', async (data, thunkAPI) => {
    try {
        console.log(data);
        await axios.patch(`${backendURL}/users/log_out`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'AUTH_TOKEN': `${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                if (res.data.status === 200) {
                    console.log("Logout api--:", res)
                    thunkAPI.dispatch(logout(res.data));
                    localStorage.removeItem('token');
                    localStorage.removeItem('user_id');
                    localStorage.removeItem('activeKey');
                    message.success(res.data.message);
                    message.duration(5);
                }
                handleApiError(res.data);
            })
            .catch((error) => {
                console.log(error)

                return thunkAPI.rejectWithValue(error.message);

            })
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }

});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateLoginObj(state, action) {
            state.loginObj =
            {
                ...state.loginObj,
                ...action.payload
            }
            state.isAuthenticated = true;
            state.token = action.payload.token || {};
        },

        updateSignUpObj(state, action) {
            state.signupObj = {
                ...state.signupObj,
                ...action.payload
            }
            state.isAuthenticated = true;
            state.token = action.payload.token || {};

        },
        logout(state) {
            state.loginObj = initialState.loginObj;
            state.signupObj = initialState.signupObj;
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            state.token = "";
            state.user_id = ""
            state.isAuthenticated = initialState.isAuthenticated;
        }

    },
    extraReducers: (builder) => {

        //  Add case for signUp user here

        builder
            .addCase(addDoctor.pending, (state) => {
                state.loading = true;
            })
            .addCase(addDoctor.fulfilled, (state, action) => {
                state.signupObj = action.payload
                state.loading = false;
            })
            .addCase(addDoctor.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            //  Add case for login user here
            .addCase(loginDoctor.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginDoctor.fulfilled, (state, action) => {
                state.loginObj = action.payload
                state.loading = false;
            })
            .addCase(loginDoctor.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.isAuthenticated = false;
            })

            .addCase(logoutAPi.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutAPi.fulfilled, (state, action) => {
                state.isAuthenticated = false;
                state.loginObj = action.payload
                state.loading = false;
            })
            .addCase(logoutAPi.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })


    }
})




export const { updateLoginObj, updateSignUpObj, logout } = authSlice.actions;
export default authSlice.reducer;


// "start": "react-scripts start --port 3001",