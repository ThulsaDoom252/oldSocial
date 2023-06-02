import {DIRECT_EDITMODE, TOGGLE_EMAIL, TOGGLE_MOBILE_VERSION, TOGGLE_NIGHTMODE, TOGGLE_WALL,} from "./types";

export const toggleNightModeAC = (toggle) => ({type: TOGGLE_NIGHTMODE, toggle})
export const directEditModeAC = (toggle) => ({type: DIRECT_EDITMODE, toggle})
export const toggleWallAC = (toggle) => ({type: TOGGLE_WALL, toggle})
export const toggleMobileVersionAC = (toggle) => ({type: TOGGLE_MOBILE_VERSION, toggle})
export const toggleEmailAC = (toggle) => ({type: TOGGLE_EMAIL, toggle})

const initialState = {
    nightMode: false,
    directEditMode: true,
    showFakeModules: true,
    hideProfileWall: false,
    showMobileVersion: false,
    hideEmail: false,
}

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_NIGHTMODE:
            return {
                ...state,
                nightMode: action.toggle
            }

        case DIRECT_EDITMODE:
            return {
                ...state,
                directEditMode: action.toggle
            }

        case TOGGLE_MOBILE_VERSION:
            return {
                ...state,
                showMobileVersion: action.toggle
            }

        case TOGGLE_EMAIL:
            return {
                ...state,
                hideEmail: action.toggle
            }

        case TOGGLE_WALL:
            return {
                ...state,
                hideProfileWall: action.toggle
            }
        default : {
            return state
        }
    }
}


export default settingsReducer