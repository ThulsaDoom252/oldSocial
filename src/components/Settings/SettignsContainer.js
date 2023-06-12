import React, {useState} from 'react';
import authHoc from "../HOC/authHoc";
import {connect} from "react-redux";
import {compose} from "redux";
import {
    directEditModeAC,
    toggleEmailAC,
    toggleMobileVersionAC,
    toggleNightModeAC,
    toggleWallAC
} from "../../redux/settingsSlice";
import Settings from "./Settings";

const SettingsContainer = ({
                               nightMode,
                               directEditMode,
                               hideProfileWall,
                               showMobileVersion,
                               hideEmail,
                               toggleNightModeAC,
                               directEditModeAC,
                               toggleWallAC,
                               toggleMobileVersionAC,
                               toggleEmailAC,

                           }) => {
    const [currentSettingsGroup, setCurrentSettingsGroup] = useState(1)

    const handleCurrentSettingsGroup = (number) => setCurrentSettingsGroup(number)


    return <Settings {...{
        nightMode, directEditMode, hideProfileWall, showMobileVersion, hideEmail, toggleNightModeAC, directEditModeAC,
        toggleWallAC, toggleMobileVersionAC, toggleEmailAC, handleCurrentSettingsGroup, currentSettingsGroup
    }}/>

}

const settingsState = (state) => {
    return {
        auth: state.auth.isLogged,
        nightMode: state.settings.nightMode,
        directEditMode: state.settings.directEditMode,
        hideProfileWall: state.settings.hideProfileWall,
        showMobileVersion: state.settings.showMobileVersion,
        hideEmail: state.settings.hideEmail,
    }
}

export default compose(connect(settingsState, {
    toggleNightModeAC,
    directEditModeAC,
    toggleWallAC,
    toggleMobileVersionAC,
    toggleEmailAC
}), authHoc)(SettingsContainer)