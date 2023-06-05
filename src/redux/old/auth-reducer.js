import {login, loginApi} from "../api/api";
import {setAvatarTC} from "./profile/profileSlice";

import {
    ERROR_CODE_MESSAGE,
    DELETE,
    FALSY_DATA,
    GET_CAPTCHA,
    LOG_STATUS,
    SET_MY_DATA
} from "./old/types";
import {authDataFetchingAC, authFetchingAC, fetchingAC} from "./commonSlice";

//ACTION CREATORS
export const AuthAC = (id, email, login) => ({type: SET_MY_DATA, data: {id, email, login}})
export const loggerAC = (isLogged) => ({type: LOG_STATUS, isLogged})
export const errorAC = (action) => ({type: FALSY_DATA, action})
export const captchaAc = (get) => ({type: GET_CAPTCHA, get})
export const errorMessageAC = (message) => ({type: ERROR_CODE_MESSAGE, message})

//STATE

const initialState = {
    id: null,
    email: null,
    login: null,
    isLogged: false,
    error: false,
    captcha: null,
    errorMessage: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MY_DATA:
            return {
                ...state,
                id: action.data.id,
                email: action.data.email,
                login: action.data.login,
            }
        default:
            return state


        case LOG_STATUS :
            return {
                ...state, isLogged: action.isLogged
            }

        case GET_CAPTCHA :
            return {
                ...state,
                captcha: action.get
            }

        case DELETE :
            return {
                ...state,
                isLogged: false,
                id: null,
                email: null,
                name: null
            }

        case FALSY_DATA :
            return {
                ...state,
                error: action.action
            }

        case ERROR_CODE_MESSAGE: {
            return {
                ...state,
                errorMessage: action.message
            }
        }

    }
}

// THUNKS
// export const loginTC = () => (dispatch) => {
//     return login.auth().then(data => {
//         const {id, email, login} = data.data
//         const {resultCode} = data
//         debugger
//         if (resultCode === 0) {
//             dispatch(AuthAC(id, email, login))
//             dispatch(loggerAC(true))
//             dispatch(errorAC(false))
//             dispatch(setAvatarTC(id))
//             dispatch(loginFetchAC(false))
//         } else {
//             dispatch(loggerAC(false))
//         }
//     })
// }

export const loginTC = () => {
    return async (dispatch) => {
        await dispatch(authDataFetchingAC(true))
        const response = await login.auth()
        const {id, email, login: userLogin} = response.data
        const {resultCode} = response
        debugger
        if (resultCode === 0) {
            dispatch(AuthAC(id, email, userLogin))
            dispatch(loggerAC(true))
            dispatch(errorAC(false))
            dispatch(setAvatarTC(id))
            setTimeout(() => dispatch(authDataFetchingAC(false)), 500)
        } else {
            dispatch(loggerAC(false))
        }
    }
}

export const getCaptchaTC = () => {
    return async (dispatch) => {
        const response = await loginApi.getCaptcha()
        dispatch(captchaAc(response.data.url))
    }
}

export const mainLoginTC = (email, password, rememberMe, antiBotSymbols) => {
    return async (dispatch) => {
        await dispatch(authDataFetchingAC(true))
        const data =
            await loginApi.login(email, password, rememberMe, antiBotSymbols)
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
    }
}

export const logOutTC = () => {
    return async (dispatch) => {
        const data = await loginApi.logout()
        if (data.resultCode === 0) {
            dispatch(loginTC())
        }
    }
}

export default authReducer