import {apiCaller} from "../api/api";
import defaultAvatar from "./common/default-avatar.jfif"
import {createSlice} from "@reduxjs/toolkit";

//STATE
const dialogsSlice = createSlice({
    name: 'dialogs-slice',
    initialState: {
        defaultAvatar: defaultAvatar,
        randomUsers: [],
        underConstruction: true
    },
    reducers: {
        setRandomUsersAC(state, action) {
            state.randomUsers = [...action.payload]
        },
    }
})

export default  dialogsSlice.reducer
export const {setRandomUsersAC} = dialogsSlice.actions

function getRandomPage(max) {
    return Math.floor(Math.random() * max);
}

export const getRandomUsersTC = () => {
    return async (dispatch) => {
        const randomPage = getRandomPage(4000)
        const data = await apiCaller.getRandomUsers(randomPage, 5)
        dispatch(setRandomUsersAC(data.items))
    }
}

