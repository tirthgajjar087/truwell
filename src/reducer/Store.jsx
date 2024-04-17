import { configureStore } from "@reduxjs/toolkit";
import authSlice from './AuthDoctor'
import editProfile from './EditProfile'
import createRota from "./RotaReducer";
import fetchAppointment from "./AppointmentUpCom";
import docPrescription from "./DocPrescription";

const logger = (store) => (next) => (action) => {
    next(action);
}


const store = configureStore({
    reducer: {
        auth: authSlice,
        DocEditProfile: editProfile,
        newRota: createRota,
        fetchAppointment: fetchAppointment,
        myprescription: docPrescription
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(logger)

})

export default store;