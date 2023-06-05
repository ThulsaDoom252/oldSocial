import React, {useEffect, useState} from 'react';
import {HiOutlineDotsHorizontal} from "react-icons/all";
import {useFormik} from "formik";
import {nightModeStyles} from "../../common/nightModeStyles";
import * as Yup from "yup";
import {fetchUiBar, fetchUiSpin} from "../../redux/commonSlice";

const LeftPart = ({
                      0: {aboutMe, userId, fullName, lookingForAJob, lookingForAJobDescription, contacts},
                      1: isCurrentUser, 2: email, 3: updateProfile, 4: directEditMode,
                      5: nightMode, 6: fetchPersonalData, 7: fetchAuthData, 8: hideEmail,
                  }) => {
    const [aboutEditMode, setAboutEditMode] = useState(false)
    const formik = useFormik({
        initialValues: {
            about: aboutMe
        },

        validationSchema: Yup.object({
            about: Yup.string().min(4, 'Info must contain more than 3 characters!')
                .max(100, "info must contain less than 100 characters").nullable(),
        }),
    })

    // useEffect(() => {
    //     if(aboutMe !== undefined) {
    //         formik.setFieldValue("about", aboutMe)
    //     } else {
    //         void 0
    //     }
    // }, [aboutMe])


    const {handleChange, values} = formik
    const toggleEditMode = (editMode, setEditMode) => {
        if (isCurrentUser && !editMode && directEditMode) {
            setEditMode(true)
        } else if (editMode === true && !errors.about) {
            debugger
            setEditMode(false)
            updateProfile({
                userId,
                about: values.about ? values.about : "no info",
                isApplicant: lookingForAJob,
                description: lookingForAJobDescription,
                name: fullName,
                github: contacts.github,
                vk: contacts.vk,
                facebook: contacts.facebook,
                instagram: contacts.instagram,
                twitter: contacts.twitter,
                website: contacts.website,
                youtube: contacts.youtube,
                mainLink: contacts.mainLink
            })
        }
    }

    const {errors} = formik
    // REFS
    const aboutBlockStyle = {
        "border": errors.about ? "solid red" : aboutEditMode && !errors.about ? "solid thin" : null
    }
    const pointerCursor = {
        cursor: directEditMode && isCurrentUser && "pointer"
    }

    return (
        <div style={nightMode ? nightModeStyles.profileLeft : null}
             className={"profile-page-left-part-container"}>
            {!fetchPersonalData && !fetchAuthData ? <div className={"profile-page-left-part-userData"}>
                <div>
                    <span className={"profile-page-left-part-label"}>Id</span>
                    {fetchAuthData ? fetchUiBar : <p>{userId}</p>}
                </div>
                <div
                    style={pointerCursor}
                    className={"profile-page-left-part-about-block"}>
                    <span className={"profile-page-left-part-label"}>About</span>
                    {!fetchPersonalData ? <p style={aboutBlockStyle} className={"profile-page-left-part-about"}
                                             onClick={() => toggleEditMode(aboutEditMode, setAboutEditMode)}>{aboutEditMode ?
                            <input id={"about"} onBlur={() => toggleEditMode(aboutEditMode, setAboutEditMode)}
                                   className={"about-input"} onChange={handleChange} type={"text"} value={values.about}
                                   autoFocus={true}/> : values.about ? values.about : "no info"}</p> :
                        fetchUiBar}
                    {isCurrentUser && errors.about ? <p className={"error"}>{errors.about}</p> : null}

                </div>
                {!hideEmail && <div>
                    <p className={"profile-page-left-part-label"}>Email</p>
                    {isCurrentUser ? fetchAuthData ? fetchUiBar : email : "No email"}
                </div>}
            </div> : <div><p>Loading...</p><p>{fetchUiBar}</p></div>}
            <div className={"profile-page-left-part-button"}>
                <button><HiOutlineDotsHorizontal/></button>
            </div>
        </div>
    );
}


export default LeftPart;