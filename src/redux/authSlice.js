import {login, loginApi} from "../api/api";
import {setAvatarTC} from "./profile/profileSlice";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {delay} from "./commonRefs";

const authSlice = createSlice({
    name: 'auth-slice',
    initialState: {
        id: null,
        email: null,
        login: null,
        isLogged: false,
        error: false,
        captcha: null,
        errorMessage: null,
        loginFetch: false,
    },
    reducers: {
        AuthAC(state, action) {
            const {id, email, userLogin} = action.payload
            state.id = id
            state.email = email
            state.login = userLogin
        },
        loggerAC(state, action) {
            state.isLogged = action.payload
        },
        toggleAuthFetch(state, action) {
            state.loginFetch = action.payload
        },
        errorAC(state, action) {
            state.error = action.payload
        },
        captchaAc(state, action) {
            state.captcha = action.payload
        },
        errorMessageAC(state, action) {
            state.errorMessage = action.payload
        },
    }
})

export default authSlice.reducer
export const {AuthAC, loggerAC, errorMessageAC, errorAC, captchaAc, toggleAuthFetch} = authSlice.actions

export const loginTC = createAsyncThunk('login-thunk', async (_, {dispatch}) => {
    await dispatch(toggleAuthFetch(true))
    const response = await login.auth()
    const {id, email, login: userLogin} = response.data
    const {resultCode} = response
    if (resultCode === 0) {
        dispatch(AuthAC({id, email, userLogin}))
        dispatch(loggerAC(true))
        dispatch(errorAC(false))
        dispatch(setAvatarTC(id))
    } else {
        dispatch(loggerAC(false))
    }
    dispatch(toggleAuthFetch(false))
})

export const getCaptchaTC = () => {
    return async (dispatch) => {
        const response = await loginApi.getCaptcha()
        dispatch(captchaAc(response.data.url))
    }
}


export const mainLoginTC = createAsyncThunk('main-login-thunk', async ({
                                                                           email,
                                                                           password,
                                                                           rememberMe,
                                                                           antiBotSymbols
                                                                       }, {dispatch}) => {
    await dispatch(toggleAuthFetch(true))
    const data = await loginApi.login(email, password, rememberMe, antiBotSymbols)
    if (data.resultCode === 0) {
        dispatch(loginTC())
        dispatch(errorAC(false))
        dispatch(errorMessageAC(null))
        dispatch(captchaAc(null))
    } else if (data.resultCode === 1) {
        dispatch(errorAC(true))
        dispatch(errorMessageAC(data.messages[0]))
    } else if (data.resultCode === 10) {
        dispatch(getCaptchaTC())
        dispatch(errorAC(true))
        dispatch(errorMessageAC(data.messages[0]))
    }
    dispatch(toggleAuthFetch(false))
})

export const logOutTC = createAsyncThunk('logout-thunk', async (_, {dispatch}) => {
    const data = await loginApi.logout()
    data.resultCode === 0 && dispatch(loginTC())

})



