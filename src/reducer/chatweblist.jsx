import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendURL } from "./AuthDoctor";

const initialState = {
    isLoading: true,
    messagelist: [],
    allPatientList: [],
    chatWithPatientList: [],
    oneChatlist: [],
    onePatientID: []
};

export const fetchNewPatientList = createAsyncThunk("chatWebList/getNewPatientList", async (data, { dispatch }) => {
    try {

        await axios.get(`${backendURL}/new_chats`, {
            headers: {
                'Content-Type': 'application/json',
                'AUTH_TOKEN': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            console.log(res.data);
            dispatch(getnewpatientlist(res.data.data));
        }).catch((err) => {
            console.log(err);
        })
    }
    catch (error) {
        console.log(error);
    }
})


export const fetchChatWithPatientList = createAsyncThunk('chatWebList/getChatWithPatientList', async (data, { dispatch }) => {
    try {

        await axios.get(`${backendURL}/chat_rooms`, {
            headers: {
                'Content-Type': 'application/json',
                'AUTH_TOKEN': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            dispatch(getChatWithPatientList(res.data.data));
            console.log("I am in chat with patient api---:", res.data);
            console.log("Old chats is--:", res.data);
        }).catch((err) => {
            console.log(err);
        })

    }
    catch (err) {
        console.log(err);
    }
})


export const fetchOnemessageList = createAsyncThunk("chatweblist/fetchOnemessageList", async (dataEx, { dispatch, getState }) => {
    try {
        // console.log(dataEx)
        let msg_id = getState().chatWebList.onePatientID.id;
        console.log("Your patiend id is-", msg_id);
        await axios.get(`${backendURL}/messages/${msg_id}`, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
                'AUTH_TOKEN': `${localStorage.getItem('token')} `
            }
        })
            .then((res) => {
                // onePatientID = []
                dispatch(getOneChatlist(res.data.data));
                console.log("I am in One chat api---:", res.data);
            }).catch((err) => {
                console.log(err);
            })
    }
    catch (err) {
        console.log(err);
    }

})

export const createNewMessage = createAsyncThunk("chatWebList/createNewMessage", async (data, { dispatch }) => {
    try {

        console.log("My get crete new data is ===:", data);

        await axios.post(`${backendURL}/new_message`, data, {
            headers: {
                'Content-Type': 'application/json',
                'AUTH_TOKEN': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            console.log("I am in create new message api---:", res.data);
            dispatch(addMessage(res.data.data));
        }).catch((err) => {
            console.log(err);
        })
    }
    catch (err) {
        console.log("Error", err)
    }
})

export const chatWebList = createSlice({
    name: "chatWebList",
    initialState,
    reducers: {
        addMessage(state, action) {
            state.messagelist.push(action.payload);
        },
        getnewpatientlist(state, action) {
            state.allPatientList = action.payload;
        },
        getChatWithPatientList(state, action) {
            state.chatWithPatientList = action.payload;
        },
        getOnePatientID(state, action) {
            state.onePatientID = action.payload;
            console.log("one patient Id  id is -----:", state.onePatientID)
        },
        getOneChatlist(state, action) {
            console.log("One chat list is -----:", state.oneChatlist)
            console.log("One action list is -----:", action.payload)
            state.oneChatlist = action.payload;
        }
    },


    extraReducers: (builder) => {
        builder
            .addCase(fetchNewPatientList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchNewPatientList.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(fetchChatWithPatientList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchChatWithPatientList.fulfilled, (state, action) => {
                state.isLoading = false;
            })
        // .addCase(fetchOnemessageList.pending, (state) => {
        //     // state.isLoading = true;
        // })
        // .addCase(fetchOnemessageList.fulfilled, (state, action) => {
        //     // state.isLoading = false;
        //     // state.oneChatlist = action.payload;
        // })
    }
});

export const { addMessage, getnewpatientlist, getChatWithPatientList, getOnePatientID, getOneChatlist } = chatWebList.actions;
export default chatWebList.reducer;


