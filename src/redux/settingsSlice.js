import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

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
            localStorage.setItem("nightMode", state.nightMode)
        },
        toggleDirectEditMode(state, action) {
            state.directEditMode = action.payload
            localStorage.setItem("directEditMode", state.directEditMode)
        },
        toggleMobileVersion(state, action) {
            state.showMobileVersion = action.payload
            localStorage.setItem("showMobileLayout", state.showMobileVersion)
        },
    }
})


export const initializeOptionsThunk = createAsyncThunk("settings-initializing-thunk", (_, {dispatch}) => {
    const isNightMode = localStorage.getItem("nightMode")
    const isDirectEditMode = localStorage.getItem("directEditMode")
    const isMobileVersion = localStorage.getItem("showMobileLayout")
    dispatch(toggleDirectEditMode(isDirectEditMode === "true"))
    dispatch(toggleNightMode(isNightMode === "true"))
    dispatch(toggleMobileVersion(isMobileVersion === "true"))
})

export default settingsSlice.reducer
export const {
    toggleNightMode,
    toggleDirectEditMode,
    toggleMobileVersion
} = settingsSlice.actions