import React from 'react';
import {nightModeStyles} from "../../common/nightModeStyles";
import {FaRegEdit} from "react-icons/fa";
import {fetchUiSpin} from "../../common/commonData";

const LeftPart = ({profileLeftPartProps, commonProps}) => {
    const [values, errors, handleChange, aboutEditMode, setAboutEditMode, email, toggleAboutEditMode, aboutBlockStyle,
        aboutDataFetch] = profileLeftPartProps
    const [isCurrentUser, pointerCursor, nightMode, userId, notFound, directEditMode] = commonProps

    return (
        <div style={nightMode ? nightModeStyles.profileLeft : null}
             className={"profile-page-left-part-container"}>
            <div className={"profile-page-left-part-userData"}>
                <div>
                    <span className={"profile-page-left-part-label"}>Id</span>
                    <p>{userId}</p>
                </div>
                <div
                    style={pointerCursor}
                    className={"profile-page-left-part-about-block"}>
                    <span
                        className={"profile-page-left-part-label"}>About {directEditMode && !aboutEditMode && isCurrentUser &&
                        <FaRegEdit
                            className={"edit-data-icon"}
                            onClick={() => toggleAboutEditMode(aboutEditMode, setAboutEditMode)}
                        />}</span>
                    <p style={aboutBlockStyle} className={"profile-page-left-part-about"}>
                        {aboutEditMode ?
                            <input id={"aboutMe"} onBlur={() => toggleAboutEditMode(aboutEditMode, setAboutEditMode)}
                                   className={"about-input"} onChange={handleChange} type={"text"}
                                   value={values.aboutMe}
                                   autoFocus={true}/> : aboutDataFetch ? fetchUiSpin : values.aboutMe ? values.aboutMe : "no info"}</p>
                    {isCurrentUser && errors.about ? <p className={"error"}>{errors.about}</p> : null}

                </div>
                <div>
                    <p className={"profile-page-left-part-label"}>Email</p>
                    {isCurrentUser ? email : "No email"}
                </div>
            </div>
        </div>
    );
}


export default LeftPart;