import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { message } from 'antd';


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    user_id: null,
    // isAuthenticated: true,

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


// export const backendURL = 'http://192.168.0.115:3000';
export const backendURL = 'https://7247-122-170-10-87.ngrok-free.app';

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
                console.log("In Login api -:", res)
                thunkAPI.dispatch(updateLoginObj(res.data));
                localStorage.setItem('token', res.data.data.token);
                localStorage.setItem('user_id', res.data.data.user_id);
                if (res.status === 200) {
                    const login_success = res.data;
                    // console.log(login_success)
                    message.success(login_success.message)
                    message.duration(7);
                }
            })
            .catch((error) => {
                if (error.response?.status === 400) {
                    console.log(error)
                    const errorMessage = error.response.data.message;
                    message.error(errorMessage);
                    message.duration(7);
                    return thunkAPI.rejectWithValue(errorMessage);
                }
                return thunkAPI.rejectWithValue(error.message);

            })

    } catch (error) {
        // message.error('An error occurred while logging in. Please try again.');
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
                console.log("SignUp api--:", res)
                thunkAPI.dispatch(updateSignUpObj(res.data))
                localStorage.setItem('token', res.data.data.token);
                if (res.status === 200) {
                    const data_message = res.data;
                    message.success(data_message.message);
                    message.duration(5);
                }
            })
            .catch((error) => {
                console.log(error)
                if (error.response?.status === 400) {
                    const errorMessage = error.response.data.message;
                    message.error(errorMessage);
                    message.duration(7);
                    return thunkAPI.rejectWithValue(errorMessage);
                }
                return thunkAPI.rejectWithValue(error.message);

            })
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }

});

//LOGOUT API
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
                console.log("Logout api--:", res)
                thunkAPI.dispatch(logout(res.data));
                localStorage.removeItem('token');
                if (res.status === 200) {
                    const logout_success = res.data;
                    message.success(logout_success.message);
                    message.duration(5);
                }
            })
            .catch((error) => {
                console.log(error)
                if (error.response?.status === 400) {
                    const errorMessage = error.response.data.message;
                    message.error(errorMessage);
                    message.duration(7);
                    return thunkAPI.rejectWithValue(errorMessage);
                }
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
            state.isAuthenticated = false;
            state.loginObj =
            {
                ...state.loginObj,
                ...action.payload
            }
            state.token = action.payload.token || {};;
        },

        updateSignUpObj(state, action) {
            state.isAuthenticated = true;
            state.signupObj = {
                ...state.signupObj,
                ...action.payload
            }
        },
        logout(state) {
            state.loginObj = initialState.loginObj;
            state.signupObj = initialState.signupObj;
            localStorage.removeItem('token');
            state.token = "";
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
                state.isAuthenticated = true;
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
                state.isAuthenticated = true;
                state.loginObj = action.payload
                state.loading = false;
            })
            .addCase(loginDoctor.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
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