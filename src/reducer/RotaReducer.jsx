import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';
import { backendURL } from "./AuthDoctor";
import axios from 'axios';
import { handleApiError } from './AuthDoctor';

const initialState = {
    isLoading: false,
    addRota: {
        available_slots: [],
        available_date: [],
    },
}

const config_header = {
    headers: {
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json',
        'AUTH_TOKEN': `${localStorage.getItem('token')}`
    },
}


export const rotaApi = createAsyncThunk("newRota/rotaApi", async (data, thunkAPI) => {
    try {
        const SendRotaApi = {
            availability: {
                start_time: data.startTime,
                end_time: data.endTime,
                for_date: data.for_date,
                duration: data.duration,
                user_id: localStorage.getItem('user_id')
            },
            doctor_info: {
                charges: data.price
            }
        }

        console.log("Post add rota  Reducer--:", SendRotaApi)
        await axios.post(`${backendURL}/doctor_availabilities_create`, SendRotaApi, {
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Content-Type': 'application/json',
                'AUTH_TOKEN': `${localStorage.getItem('token')}`
            },
        })
            .then((res) => {
                console.log("In Rota data-:", res)
                if (res.data.status === 200) {
                    console.log("In Rota data-:", res.data)
                    thunkAPI.dispatch(setRota(res.data.data));
                    message.success({
                        content: res.data.message,
                        duration: 7 // Duration in seconds
                    });
                }
                handleApiError(res.data);
            })
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }

})


export const getRotadateApi = createAsyncThunk("newRota/getRotaApi", async (id, thunkAPI) => {

    try {

        console.log("get rota date API ID IS---- ", id)
        await axios.get(`${backendURL}/available_dates/${id}`, {
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Content-Type': 'application/json',
                'AUTH_TOKEN': `${localStorage.getItem('token')}`
            },
        })
            .then((res) => {
                console.log("In Rota data then -:", res.data)
                if (res.data.status === 200) {
                    thunkAPI.dispatch(getRotaDate(res.data.data));
                    message.success({
                        content: res.data.message,
                        duration: 7 // Duration in seconds
                    });
                    thunkAPI.dispatch(updateRotaSlots(res.data.time_slot));
                }
                handleApiError(res.data);
            })
            .catch((err) => {
                console.log("Error in get rota date API", err)
            })
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }

})


export const getRotaSlotsApi = createAsyncThunk(
    'newRota/getRotaSlotsApi',
    async (date, thunkAPI) => {
        try {
            console.log("In Rota slots - Date ID:", date);

            await axios.get(`${backendURL}/available_slots`,
                {
                    params: {
                        for_date: date
                    },
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                        'Content-Type': 'application/json',
                        'AUTH_TOKEN': `${localStorage.getItem('token')}`
                    }
                })
                .then((res) => {
                    console.log("In Rota slots - Date ID:", res.data);
                    if (res.data.status === 200) {
                        thunkAPI.dispatch(updateRotaSlots(res.data.data));
                    }
                    handleApiError(res.data);
                })

        } catch (error) {
            console.error("Error fetching slots:", error);
            throw error;
        }
    }
);


export const createRota = createSlice({
    name: "newRota",
    initialState,
    reducers: {
        setRota: (state, action) => {
            state.addRota = action.payload;
        },
        getRotaDate: (state, action) => {
            // state.addRota.available_date = action.payload;
            state.addRota = {
                ...state.addRota,
                available_date: action.payload,
            }
        },
        updateRotaSlots: (state, action) => {
            state.addRota = {
                ...state.addRota,
                available_slots: action.payload,
            };
            console.log("Available Slots in reducer side:", state.addRota.available_slots);
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(rotaApi.pending, (state) => {
                state.isLoading = true;
            }
            )
            .addCase(rotaApi.fulfilled, (state, action) => {
                state.isLoading = false;

            }
            )
            .addCase(rotaApi.rejected, (state, action) => {
                state.isLoading = false;
            }
            )
            .addCase(getRotadateApi.pending, (state) => {
                state.isLoading = true;
            }
            )
            .addCase(getRotadateApi.fulfilled, (state, action) => {
                state.isLoading = false;
                return action.payload;
            }
            )
            .addCase(getRotadateApi.rejected, (state, action) => {
                state.isLoading = false;
            }
            )

            .addCase(getRotaSlotsApi.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRotaSlotsApi.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(getRotaSlotsApi.rejected, (state) => {
                state.isLoading = false;
            });
    }


})


export const { setRota, getRotaDate, updateRotaSlots } = createRota.actions;
export default createRota.reducer;