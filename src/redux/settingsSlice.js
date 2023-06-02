import {createSlice} from "@reduxjs/toolkit";

const settingsSlice = createSlice({
    name: 'settings-slice',
    initialState: {
        nightMode: false,
        directEditMode: true,
        showFakeModules: true,
        hideProfileWall: false,
        showMobileVersion: false,
        hideEmail: false,
    },
    reducers: {
        toggleNightModeAC(state, action) {
            state.nightMode = action.payload
        },
        directEditModeAC(state, action) {
            state.directEditMode = action.payload
        },
        toggleWallAC(state, action) {
            state.hideProfileWall = action.payload
        },
        toggleMobileVersionAC(state, action) {
            state.showMobileVersion = action.payload
        },
        toggleEmailAC(state, action) {
            state.hideEmail = action.payload
        },
    }

})

export default settingsSlice.reducer
export const {
    toggleNightModeAC,
    toggleWallAC,
    directEditModeAC,
    toggleEmailAC,
    toggleMobileVersionAC
} = settingsSlice.actions