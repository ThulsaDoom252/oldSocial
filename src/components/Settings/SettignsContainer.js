import React, {useState} from 'react';
import authHoc from "../HOC/authHoc";
import {connect} from "react-redux";
import {compose} from "redux";
import Settings from "./Settings";
import {toggleDirectEditMode, toggleMobileVersion, toggleNightMode} from "../../redux/settingsSlice";

const SettingsContainer = ({
                               nightMode,
                               directEditMode,
                               showMobileVersion,
                               toggleNightMode,
                               toggleDirectEditMode,
                               toggleMobileVersion,

                           }) => {
    const [currentSettingsGroup, setCurrentSettingsGroup] = useState(1)

    const handleChange = () => void 0

    const handleCurrentSettingsGroup = (number) => setCurrentSettingsGroup(number)

    return <Settings {...{
        nightMode,
        directEditMode,
        showMobileVersion,
        toggleNightMode,
        toggleDirectEditMode,
        handleChange,
        toggleMobileVersion,
        handleCurrentSettingsGroup,
        currentSettingsGroup,
    }}/>
}

const settingsState = (state) => {
    return {
        auth: state.auth.isLogged,
        nightMode: state.settings.nightMode,
        directEditMode: state.settings.directEditMode,
        showMobileVersion: state.settings.showMobileVersion,
    }
}

export default compose(connect(settingsState, {
    toggleNightMode,
    toggleDirectEditMode,
    toggleMobileVersion,
}), authHoc)(SettingsContainer)