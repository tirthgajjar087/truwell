


const initialState = {
    addRota: {
        rota_time: "",
        rota_date: "",
        for_date: "",
        duration: "",
        price: "",
    }
}

export const createRota = createSlice({
    name: "newRota",
    initialState,
    reducers: {

        setRota: (state, action) => {
            state.setRota = action.payload;
        }



    }

})