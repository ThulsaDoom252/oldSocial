import {createSlice} from "@reduxjs/toolkit";

const settingsSlice = createSlice({
    name: 'settings-slice',
    initialState: {
        nightMode: false,
        directEditMode: true,
        showFakeModules: true,
        showMobileVersion: false,
    },
    reducers: {
        toggleNightMode(state, action) {
            state.nightMode = action.payload
        },
        toggleDirectEditMode(state, action) {
            state.directEditMode = action.payload
        },
        toggleMobileVersion(state, action) {
            state.showMobileVersion = action.payload
        },
    }
})

export default settingsSlice.reducer
export const {
    toggleNightMode,
    toggleDirectEditMode,
    toggleMobileVersion
} = settingsSlice.actions