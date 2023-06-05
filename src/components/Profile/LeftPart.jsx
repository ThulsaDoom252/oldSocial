import React, {useEffect, useState} from 'react';
import {HiOutlineDotsHorizontal} from "react-icons/all";
import {useFormik} from "formik";
import {nightModeStyles} from "../../common/nightModeStyles";
import * as Yup from "yup";
import {fetchUiBar} from "../../redux/commonSlice";

const LeftPart = ({
                      profile, isCurrentUser, email, updateProfileTC, directEditMode,
                      nightMode, fetchPersonalData, fetchAuthData, hideEmail
                  }) => {
    const {aboutMe, userId} = profile
    const [aboutEditMode, setAboutEditMode] = useState(false)

    const formik = useFormik({
        initialValues: {
            aboutMe
        },

        validationSchema: Yup.object({
            aboutMe: Yup.string().min(4, 'Info must contain more than 3 characters!')
                .max(100, "info must contain less than 100 characters").nullable(),
        }),
    })


    const {handleChange, values, errors} = formik
    const toggleEditMode = (editMode, setEditMode) => {
        if (isCurrentUser && !editMode && directEditMode) {
            setEditMode(true)
        } else if (editMode === true && !errors.about) {
            setEditMode(false)
            updateProfileTC({
                about: values.aboutMe ? values.aboutMe : "no info",
            })
        }
    }

    useEffect(() => {
        if (aboutMe) {
            formik.setFieldValue("aboutMe", aboutMe)
        }
    }, []);

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
                                   className={"about-input"} onChange={handleChange} type={"text"} value={values.aboutMe}
                                   autoFocus={true}/> : values.aboutMe ? values.aboutMe : "no info"}</p> :
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