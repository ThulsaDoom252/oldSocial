import React from 'react';
import {nightModeStyles} from "../../common/nightModeStyles";
import SettingsBlock from "./Settings-block";

const Settings = ({currentSettingsGroup, handleCurrentSettingsGroup, nightMode, toggleNightModeAC, showMobileVersion,
                      toggleMobileVersionAC, directEditModeAC, directEditMode, hideProfileWall, hideEmail,
                      toggleWallAC, toggleEmailAC}) => {
    return (
        <div style={nightMode ? nightModeStyles.settings : null} className={"settings-page-container"}>
            <div className="settings-left-part">
                <div className={"settings-left-part-block"}>
                    <p style={{"text-decoration": currentSettingsGroup === 1 && "underline"}} className="settings-class"
                       onClick={() => handleCurrentSettingsGroup(1)}>Profile</p>
                    <p style={{"text-decoration": currentSettingsGroup === 2 && "underline"}} className="settings-class"
                       onClick={() => handleCurrentSettingsGroup(2)}>Style</p>
                </div>
            </div>
            <div className="settings-right-part">
                <p className={"settings-right-part-title"}>Settings</p>
                <div className={"settings-right-part-block"}>
                    {currentSettingsGroup === 1 &&
                        <div>
                            <SettingsBlock label={"NightMode"} option={nightMode} setOption={toggleNightModeAC}
                                           disabled={false}/>
                            <SettingsBlock className={"show-mobile-version-switch"} label={"Show Mobile Version"}
                                           option={showMobileVersion}
                                           setOption={toggleMobileVersionAC}/>
                        </div>}
                    {currentSettingsGroup === 2 && <div>
                        <SettingsBlock label={"Direct on profile page"} option={directEditMode}
                                       setOption={directEditModeAC}/>
                        <SettingsBlock label={"Hide wall"} option={hideProfileWall} setOption={toggleWallAC}/>
                        <SettingsBlock label={"Hide email"} option={hideEmail} setOption={toggleEmailAC}/>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Settings;