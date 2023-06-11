import React from 'react';
import {fetchUiSpin} from "../../../redux/commonSlice";
import {isLookingForAJobData, lookingForAJobDataInfo} from "../../../redux/profile/constants";

const ProfileData = ({isCurrentUser, fetchPersonalData, profileDataProps}) => {
    const [handleChange, values, errors, toggleProfileEditMode,
        descriptionEditMode, setDescriptionEditMode, centerProfileAboutEditMode, setCenterProfileAboutEditMode,
        directEditFunc, jobDescriptionStyle, applicantHook, handleApplicantUpdate, pointerCursor,
        aboutBlockStyle, isLookingForAJobDataFetch, isLookingForAJobDataUploadStatus, jobDescriptionDataFetch, jobDescriptionDataUploadStatus,
    ] = profileDataProps
    return (
        <div>
            <div style={pointerCursor}
                 className={`user-data-block ${isLookingForAJobDataUploadStatus && "user-data-block-uploaded"}`}
                 onClick={() => directEditFunc && handleApplicantUpdate(isLookingForAJobData)}
            >
                {isLookingForAJobDataFetch ? fetchUiSpin : applicantHook && isCurrentUser ? "You are looking for a job" : applicantHook && !isCurrentUser ? "Looking for a job" : "Not looking for a job"}
            </div>
            <div
                style={jobDescriptionStyle}
                className={`user-data-block ${jobDescriptionDataUploadStatus && "user-data-block-uploaded"}`}>
                {fetchPersonalData ? fetchUiSpin : descriptionEditMode ?
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
                {fetchPersonalData ? fetchUiSpin : centerProfileAboutEditMode ?
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


















