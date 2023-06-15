import {apiCaller} from "../api/api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

//STATE
const dialogsSlice = createSlice({
    name: 'dialogs-slice',
    initialState: {
        randomUsers: [],
        underConstruction: true
    },
    reducers: {
        setRandomUsersAC(state, action) {
            state.randomUsers = [...action.payload]
        },
    }
})

export default dialogsSlice.reducer
export const {setRandomUsersAC} = dialogsSlice.actions


export const getRandomUsersTC = createAsyncThunk(
    'getRandomUsers-thunk', async (_, {dispatch}) => {
        const randomPage = Math.floor(Math.random() * 4000)
        const data = await apiCaller.getRandomUsers(randomPage, 5)
        dispatch(setRandomUsersAC(data.items))
    }
)

