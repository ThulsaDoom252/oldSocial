import {login, loginApi} from "../api/api";
import {setAvatarTC} from "./profile/profileSlice";
import {authDataFetchingAC} from "./commonSlice";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

//ACTION CREATORS

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
export const {AuthAC, loggerAC, errorMessageAC, errorAC, captchaAc} = authSlice.actions

export const loginTC = createAsyncThunk('login-thunk', async (_, {dispatch}) => {
    await dispatch(authDataFetchingAC(true))
    const response = await login.auth()
    const {id, email, login: userLogin} = response.data
    const {resultCode} = response
    if (resultCode === 0) {
        dispatch(AuthAC({id, email, userLogin}))
        dispatch(loggerAC(true))
        dispatch(errorAC(false))
        dispatch(setAvatarTC(id))
        setTimeout(() => dispatch(authDataFetchingAC(false)), 500)
    } else {
        dispatch(loggerAC(false))
    }
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
    await dispatch(authDataFetchingAC(true))
    const data = await loginApi.login(email, password, rememberMe, antiBotSymbols)
    if (data.resultCode === 0) {
        dispatch(loginTC())
        dispatch(errorAC(false))
        dispatch(errorMessageAC(null))
        dispatch(captchaAc(null))
        dispatch(authDataFetchingAC(false))
    } else if (data.resultCode === 1) {
        dispatch(errorAC(true))
        dispatch(errorMessageAC(data.messages[0]))
        dispatch(authDataFetchingAC(false))
    } else if (data.resultCode === 10) {
        dispatch(getCaptchaTC())
        dispatch(errorAC(true))
        dispatch(errorMessageAC(data.messages[0]))
        dispatch(authDataFetchingAC(false))
    }
})

export const logOutTC = createAsyncThunk('logout-thunk', async (_, {dispatch}) => {
    const data = await loginApi.logout()
    data.resultCode === 0 && dispatch(loginTC())

})



