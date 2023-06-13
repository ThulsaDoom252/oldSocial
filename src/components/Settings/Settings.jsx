import React from 'react';
import {nightModeStyles} from "../../common/nightModeStyles";
import SettingsBlock from "./Settings-block";

const Settings = ({
                      currentSettingsGroup, handleCurrentSettingsGroup, nightMode, toggleNightMode, showMobileVersion,
                      toggleMobileVersion, toggleDirectEditMode, directEditMode
                  }) => {
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
                            <SettingsBlock label={"Direct on profile page"} option={directEditMode}
                                           setOption={toggleDirectEditMode}/>
                        </div>}
                    {currentSettingsGroup === 2 && <div>
                        <SettingsBlock label={"NightMode"} option={nightMode} setOption={toggleNightMode}
                                       disabled={false}/>
                        <SettingsBlock className={"show-mobile-version-switch"} label={"Mobile Version"}
                                       option={showMobileVersion}
                                       setOption={toggleMobileVersion}/>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Settings;