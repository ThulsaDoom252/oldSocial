import {getAuthDataThunk} from "./authSlice";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setStatusThunk, setUserThunk} from "./profile/profileSlice";
import {initializeOptionsThunk} from "./settingsSlice";
import {apiCaller} from "../api/api";
import {getFriends} from "./userSlice";

const appSlice = createSlice({
    name: 'app-slice',
    initialState: {
        initialized: false,
        profileInitialized: false,
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
        initializeApp(state, action) {
            state.initialized = action.payload
        },
        initializeProfile(state, action) {
            state.profileInitialized = action.payload
        }
    },
})

export default appSlice.reducer
export const {initializeApp, initializeProfile} = appSlice.actions

//THUNKS
export const initializeAppThunk = createAsyncThunk('initializing-thunk',
    async (_, {dispatch}) => {
        dispatch(initializeApp(false))
        const initializeAuthData = await dispatch(getAuthDataThunk())
        const initializeOptions = await dispatch(initializeOptionsThunk())
        Promise.all([initializeAuthData, initializeOptions]).then(() => {
            dispatch(initializeApp(true))
        })

    })

export const initializeProfileThunk = createAsyncThunk('initialize-profile-thunk', async ({
                                                                                              userId,
                                                                                              friendsArray,
                                                                                              friendsCount,
                                                                                              profilePageNotFound,
                                                                                          }, {dispatch}) => {
        dispatch(initializeProfile(false))
        const receivedFriendsArray = friendsArray.length === 0 ? await apiCaller.getFriends(friendsCount) : friendsArray
        const friends = friendsArray.length === 0 ? receivedFriendsArray.items : receivedFriendsArray
        const initializeUserFriends = dispatch(getFriends(friends))
        const initializeUserData = dispatch(setUserThunk({userId, friends, profilePageNotFound}))
        const initializeUserStatus = dispatch(setStatusThunk(userId))
        Promise.all([initializeUserData, initializeUserStatus, initializeUserFriends]).then(() => {
            dispatch(initializeProfile(true))
        })

})

