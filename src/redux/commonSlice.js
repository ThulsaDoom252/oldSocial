import React from "react";
import loadingBar from "../components/common/loading-bar.gif"
import headerLoading from "../components/common/headerLoading.gif"
import avatarLoading from "../components/common/fetchAvatar.gif"
import {createSlice} from "@reduxjs/toolkit";

export const fetchUiSpin = <p><i className={"fa fa-spinner fa-spin"}></i></p>
export const fetchUiBar = <p><img className={"loading-bar"} src={loadingBar} alt=""/></p>
export const fetchUiHeader = <p><img className={"header-loading"} src={headerLoading} alt="loading..."/></p>
export const fetchUsers = <p><img className={"header-loading"} src={headerLoading} alt="loading..."/></p>
export const fetchAvatar = <img src={avatarLoading} alt="loading..."/>

const commonSlice = createSlice({
    name: 'common-slice',
    initialState: {
        fetchPersonalData: false,
        fetchAuthData: false,
        fetchStatusData: false,
        fetchAvatar: false,
    },
    reducers: {
        personalDataFetchingAC(state, action) {
            state.fetchPersonalData = action.payload
        },
        authDataFetchingAC(state, action) {
            state.fetchAuthData = action.payload
        },
        statusDataFetchingAC(state, action) {
            state.fetchStatusData = action.payload
        },
        avatarDataFetchingAC(state, action) {
            state.fetchAvatar = action.payload
        },
    }
})

export default commonSlice.reducer
export const {
    personalDataFetchingAC,
    authDataFetchingAC,
    statusDataFetchingAC,
    avatarDataFetchingAC
} = commonSlice.actions

