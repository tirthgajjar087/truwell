import { configureStore } from "@reduxjs/toolkit";
import authSlice from './AuthDoctor'
import editProfile from './EditProfile'
import createRota from "./RotaReducer";

const logger = (store) => (next) => (action) => {
    next(action);
}


const store = configureStore({
    reducer: {
        auth: authSlice,
        DocEditProfile: editProfile,
        newRota: createRota
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)

})

export default store;