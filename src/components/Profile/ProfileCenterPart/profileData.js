import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import {fetchUiSpin} from "../../../redux/commonSlice";

const ProfileData = ({
                         0: {
                             userId,
                             fullName,
                             aboutMe,
                             lookingForAJob: applicant,
                             lookingForAJobDescription: description,
                             contacts
                         },
                         1: isCurrentUser,
                         2: updateProfile,
                         3: directEditMode,
                         4: fetchPersonalData,
                     }) => {
    const [applicantHook, setApplicantHook] = useState(null)
    const [descriptionEditMode, setDescriptionEditMode] = useState(false)
    const [aboutEditMode, setAboutEditMode] = useState(false)
    const formik = useFormik({
        initialValues: {
            applicantDescription: description,
            about: aboutMe,
        },

    })

    const {values, errors, handleChange} = formik

    useEffect(() => {
        formik.setFieldValue("applicantDescription", description)
        formik.setFieldValue("about", aboutMe)
        setApplicantHook(!!applicant)
    }, [applicant, description, aboutMe])

    const directEditRef = isCurrentUser && directEditMode

    const toggleEditMode = (editMode, setEditMode) => {
        if (isCurrentUser && !editMode && directEditMode) {
            setEditMode(true)
        } else if (editMode && !errors.description) {
            setEditMode(false)
            updateProfileFunc()
        }
    }

    const updateProfileFunc = (applicant = applicantHook) => {
        updateProfile(userId, values.about,
            applicant, values.applicantDescription,
            fullName, contacts.github,
            contacts.vk, contacts.facebook,
            contacts.instagram, contacts.twitter,
            contacts.website,
            contacts.youtube, contacts.mainlink)
    }

    const applicantRelay = () => applicantHook ? setApplicantHook(false) : setApplicantHook(true)

    const applicantUpdate = () => {
        applicantRelay()
        if (!applicantHook) {
            updateProfileFunc(true)
        } else {
            updateProfileFunc(false)
        }
    }

    useEffect(() => {
        console.log(applicantHook)
    }, [applicantHook])

    //Func Refs
    const directEditFunc = isCurrentUser && directEditMode


    // STYLES REFS
    const descriptionBlockStyle = {
        "border": errors.applicantDescription ? "solid red" : descriptionEditMode && !errors.applicantDescription ? "solid yellow" : null
    }
    const aboutBlockStyle = {
        "border": errors.about ? "solid red" : aboutEditMode && !errors.about ? "solid yellow" : null
    }
    const pointerCursor = {
        cursor: directEditFunc && isCurrentUser ? "pointer" : "default",
    }

    return (
        <div>
            <div style={pointerCursor}
                 className={"user-data-block"}
                 onClick={() => directEditFunc && applicantUpdate()}
            >
                {fetchPersonalData ? fetchUiSpin : applicantHook && isCurrentUser ? "You are looking for a job" : applicantHook && !isCurrentUser ? "Looking for a job" : "Not looking for a job"}
            </div>
            <div
                style={descriptionBlockStyle}
                className={"user-data-block"}>
                {fetchPersonalData ? fetchUiSpin : descriptionEditMode ?
                    <input id={"applicantDescription"} className={"job-description-input"}
                           onChange={handleChange}
                           onBlur={() => toggleEditMode(descriptionEditMode, setDescriptionEditMode)} autoFocus={true}
                           type="text" value={values.applicantDescription}/> :
                    <p style={pointerCursor} className={"job-description"}
                       onClick={() => toggleEditMode(descriptionEditMode, setDescriptionEditMode)}>{values.applicantDescription ? values.applicantDescription : "No info about job/skills"}</p>}
            </div>
            {errors.applicantDescription && <p className={"profile-page-input-error"}>{errors.applicantDescription}</p>}
            <div style={aboutBlockStyle} className={"user-data-block-about"}>
                {fetchPersonalData ? fetchUiSpin : aboutEditMode ?
                    <input id={"about"} className={"about-description-input"} onChange={handleChange}
                           onBlur={() => toggleEditMode(aboutEditMode, setAboutEditMode)} autoFocus={true}
                           type="text" value={values.about}/> :
                    <p className={"job-description"}
                       onClick={() => toggleEditMode(aboutEditMode, setAboutEditMode)}>{values.about ? values.about : "No info"}</p>}</div>
            {errors.about && <p className={"profile-page-input-error"}>{errors.about}</p>}
        </div>

    )
}

export default ProfileData;
