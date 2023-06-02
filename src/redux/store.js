import usersReducer from "./userSlice";
import authReducer from "./auth-reducer";
import appSlice from "./appSlice";
import dialogsReducer from "./dialogs-reducer";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import profileSlice from "./profile/profileSlice";
import commonSlice from "./commonSlice";
import settingsSlice from "./settingsSlice";

const reducer = combineReducers({
    profilePage: profileSlice,
    app: appSlice,
    common: commonSlice,
    usersPage: usersReducer,
    dialogsPage: dialogsReducer,
    auth: authReducer,
    settings: settingsSlice,
})

export const store = configureStore({reducer})
