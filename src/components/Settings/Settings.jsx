import React from 'react';
import {nightModeStyles} from "../../common/nightModeStyles";
import SettingsBlock from "./Settings-block";
import {directEditModeInfo, showMobileLayoutInfo} from "../../common/commonData";

const Settings = ({
                      currentSettingsGroup, handleCurrentSettingsGroup, nightMode, toggleNightMode, showMobileVersion,
                      toggleMobileVersion, toggleDirectEditMode, directEditMode, handleChange,
                  }) => {
    return (
        <div style={nightMode ? nightModeStyles.settings : null} className={"settings-page-container"}>
            <div className="settings-left-part">
                <div className={"settings-left-part-block"}>
                    <p style={{"textDecoration": currentSettingsGroup === 1 ? "underline" : void 0}}
                       className="settings-class"
                       onClick={() => handleCurrentSettingsGroup(1)}>Profile</p>
                    <p style={{"textDecoration": currentSettingsGroup === 2 ? "underline" : void 0}}
                       className="settings-class"
                       onClick={() => handleCurrentSettingsGroup(2)}>Style</p>
                </div>
            </div>
            <div className="settings-right-part">
                <p className={"settings-right-part-title"}>Settings</p>
                <div className={"settings-right-part-block"}>
                    {currentSettingsGroup === 1 &&
                        <div>
                            <SettingsBlock toggleInfo={true} title={directEditModeInfo} label={"Direct on profile page"}
                                           option={directEditMode}
                                           setOption={toggleDirectEditMode}
                                           {...{handleChange}}
                            />
                        </div>}
                    {currentSettingsGroup === 2 && <div>
                        <SettingsBlock label={"NightMode"} option={nightMode} setOption={toggleNightMode}
                                       disabled={false} {...{handleChange}}/>
                        <SettingsBlock className={"show-mobile-version-switch"} label={"Mobile Version"}
                                       option={showMobileVersion}
                                       toggleInfo={true}
                                       title={showMobileLayoutInfo}
                                       setOption={toggleMobileVersion}
                                       {...{handleChange}}
                        />
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Settings;