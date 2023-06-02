import {AUTH_DATA_FETCHING, AVATAR_DATA_FETCHING, PERSONAL_DATA_FETCHING, STATUS_DATA_FETCHING} from "./types";
import React from "react";
import loadingBar from "../components/common/loading-bar.gif"
import headerLoading from "../components/common/headerLoading.gif"
import avatarLoading from "../components/common/fetchAvatar.gif"

export const fetchUiSpin = <p><i className={"fa fa-spinner fa-spin"}></i></p>
export const fetchUiBar = <p><img className={"loading-bar"} src={loadingBar} alt=""/></p>
export const fetchUiHeader = <p><img className={"header-loading"} src={headerLoading} alt="loading..."/></p>
export const fetchUsers = <p><img className={"header-loading"} src={headerLoading} alt="loading..."/></p>
export const fetchAvatar = <img src={avatarLoading} alt="loading..."/>

export const personalDataFetchingAC = (isFetch) => ({type: PERSONAL_DATA_FETCHING, isFetch})
export const authDataFetchingAC = (isFetch) => ({type: AUTH_DATA_FETCHING, isFetch})
export const statusDataFetchingAC = (isFetch) => ({type: STATUS_DATA_FETCHING, isFetch})
export const avatarDataFetchingAC = (isFetch) => ({type: AVATAR_DATA_FETCHING, isFetch})

const initialState = {
    fetchPersonalData: false,
    fetchAuthData: false,
    fetchStatusData: false,
    fetchAvatar: false,
}

export const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case PERSONAL_DATA_FETCHING:
            return {
                ...state, fetchPersonalData: action.isFetch
            }
        default:
            return state

        case AUTH_DATA_FETCHING:
            return {
                ...state, fetchAuthData: action.isFetch
            }
        case STATUS_DATA_FETCHING:
            return {
                ...state, fetchStatusData: action.isFetch
            }
        case AVATAR_DATA_FETCHING:
            return {
                ...state, fetchAvatar: action.isFetch
            }
    }
}