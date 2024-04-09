import { configureStore } from "@reduxjs/toolkit";
import authSlice from './AuthDoctor'
import editProfile from './EditProfile'


const logger = (store) => (next) => (action) => {
    next(action);
}


const store = configureStore({
    reducer: {
        auth: authSlice,
        DocEditProfile: editProfile
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)

})

export default store;