import React from 'react';
import {fetchUiSpin, lookingForAJobDataInfo} from "../../../common/commonData";

const ProfileData = ({isCurrentUser, profileDataProps}) => {
    const [handleChange, values, errors, toggleProfileEditMode,
        descriptionEditMode, setDescriptionEditMode, centerProfileAboutEditMode, setCenterProfileAboutEditMode,
        directEditFunc, jobDescriptionStyle, pointerCursor,
        aboutBlockStyle, isLookingForAJobDataFetch, isLookingForAJobDataUploadStatus, jobDescriptionDataFetch, jobDescriptionDataUploadStatus,
        handleChangeIsLookingForAJobInfo
    ] = profileDataProps

    return (
        <div>
            <div style={pointerCursor}
                 className={`user-data-block ${isLookingForAJobDataUploadStatus && "user-data-block-uploaded"}`}
                 onClick={() => directEditFunc && handleChangeIsLookingForAJobInfo(!values.lookingForAJob)}>
                {isLookingForAJobDataFetch ? fetchUiSpin : values.lookingForAJob && isCurrentUser ? "You are looking for a job" : values.lookingForAJob && !isCurrentUser ? "Looking for a job" : "Not looking for a job"}
            </div>
            <div
                style={jobDescriptionStyle}
                className={`user-data-block ${jobDescriptionDataUploadStatus && "user-data-block-uploaded"}`}>
                {descriptionEditMode ?
                    <input id={"applicantDescription"} className={"job-description-input"}
                           onChange={handleChange}
                           onBlur={() => toggleProfileEditMode(descriptionEditMode, setDescriptionEditMode, lookingForAJobDataInfo)}
                           autoFocus={true}
                           type="text" value={values.applicantDescription}/> :
                    <p style={pointerCursor} className={"job-description"}
                       onClick={() => toggleProfileEditMode(descriptionEditMode, setDescriptionEditMode)}>{jobDescriptionDataFetch ? fetchUiSpin : values.applicantDescription ? values.applicantDescription : "No info about job/skills"}</p>}
            </div>
            {errors.applicantDescription && <p className={"profile-page-input-error"}>{errors.applicantDescription}</p>}
            <div style={aboutBlockStyle} className={"user-data-block-about"}>
                {centerProfileAboutEditMode ?
                    <input id={"about"} className={"about-description-input"} onChange={handleChange}
                           onBlur={() => toggleProfileEditMode(centerProfileAboutEditMode, setCenterProfileAboutEditMode)}
                           autoFocus={true}
                           type="text" value={values.about}/> :
                    <p className={"job-description"}
                       onClick={() => toggleProfileEditMode(centerProfileAboutEditMode, setCenterProfileAboutEditMode)}>{values.about ? values.about : "No info"}</p>}</div>
            {errors.about && <p className={"profile-page-input-error"}>{errors.about}</p>}
        </div>
    )
}

export default ProfileData;


















