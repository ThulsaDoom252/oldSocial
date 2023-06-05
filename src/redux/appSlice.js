import {loginTC} from "./authSlice";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'app-slice',
    initialState: {
        initialized: false,
        hideNonFunctionalPages: false,
        nightMode: false,
        nightModeColors: {
            "sidebar/header-background": "#0B18DCFF",
            "nightMode-text-color": "#e3cfcf",
            "nightMode-profile-buttons-text-color": "#5e5353",
            "nightMode-border-color": "#a8a3a3",
            "sidebar-item/header-burger-item-active": "#ffffff",
            "content-background": "#6B5F5FFF",
            "profile-header": "#2A4670FF",
            "nightMode-container-block": "#0D4570FF",
            "profile-block-border-shadow": "inset 6px 6px 6px #888686, inset -6px -6px 6px #a8a3a3",
            "wrapper-background": "#111111",
            "header-slogan-title/welcome-label": "#6b8dd2",
            "header-slogan-text/user-name": "#fff8f8",
            "header-buttons-color": "#fdf7f7",
            "header-burger-button-color": "#fdf7f7",
            "header-burger-menu": "#296069",
            "sidebar-item/header-burger-item": "#c6dae3",
        },
    },
    reducers: {
        initializeAC(state) {
            state.initialized = true
        },
        toggleNonFunctionalPages(state, action) {
            state.hideNonFunctionalPages = action.payload
        },
    },
})

export default appSlice.reducer
export const {initializeAC} = appSlice.actions

//THUNKS
export const initializeTC = createAsyncThunk('initializing-thunk',
    async (_, {dispatch}) => {
        debugger
        try {
            const promise = dispatch(loginTC())
            Promise.all([promise]).then(() => {
                dispatch(initializeAC())
            })
        } catch (error) {
            console.log(error)
        }

    })

