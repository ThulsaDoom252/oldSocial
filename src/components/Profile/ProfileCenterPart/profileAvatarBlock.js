import React from 'react';
import Status from "./Status";
import {CgWebsite, SiFacebook, SiGithub, SiInstagram, SiTwitter, SiVk, SiYoutube} from "react-icons/all";
import {Link} from "react-router-dom";
import {useFormik} from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import {fetchUiSpin} from "../../../redux/commonSlice";

const ProfileAvatarBlock = ({
                                0: {
                                    userId,
                                    fullName,
                                    aboutMe,
                                    lookingForAJob,
                                    lookingForAJobDescription,
                                    photos: {large: largePhoto},
                                    contacts: {youtube, instagram, vk, facebook, github, twitter, website, mainlink}
                                },
                                1: isCurrentUser,
                                2: directEditMode,
                                3: updateProfile,
                                4: defaultAvatar,
                                5: status,
                                6: updateStatus,
                                7: toggleOverLay,
                                8: updatePhoto,
                                9: fetchPersonalData,
                                10: fetchStatusData,
                            }) => {


    //Direct upload photo
    const hiddenFileInput = React.useRef(null);
    const uploadPhoto = (e) => updatePhoto(e.target.files[0])
    const handleClick = event => isCurrentUser ? hiddenFileInput.current.click() : null;

    const [nameEditMode, setNameEditMode] = useState(false)
    const [contactsBlockEditMode, setContactsBlockEditMode] = useState(false)
    const [youtubeEditMode, setYoutubeEditMode] = useState(false)
    const [twitterEditMode, setTwitterEditMode] = useState(false)
    const [instagramEditMode, setInstagramEditMode] = useState(false)
    const [facebookEditMode, setFacebookEditMode] = useState(false)
    const [githubEditMode, setGithubEditMode] = useState(false)
    const [vkEditMode, setVkEditMode] = useState(false)
    const [websiteEditMode, setWebsiteEditMode] = useState(false)
    const [contactEditMode, setContactEditMode] = useState(false)


    const urlError = Yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Enter correct url!').nullable()

    const formik = useFormik({
        initialValues: {
            name: fullName,
            about: aboutMe,
            isApplicant: lookingForAJob,
            description: lookingForAJobDescription,
            website,
            vk,
            facebook,
            twitter,
            instagram,
            github,
            mainlink,
            youtube,
        },

        validationSchema: Yup.object({
            name: Yup.string().required(),
            about: Yup.string().min(4, 'Info must contain more than 3 characters!').nullable(),
            jobDescription: Yup.string().min(4, 'Job description must contain more than 3 characters!').nullable(),
            vk: urlError,
            facebook: urlError,
            instagram: urlError,
            twitter: urlError,
            website: urlError,
            youtube: urlError,
            github: urlError,
            mainlink: urlError,

        }),
    })

    const values = formik.values
    window.link = values

    const toggleProfileDataEditMode = (editMode, setEditMode) => {
        if (!editMode && isCurrentUser && directEditMode) {
            setEditMode(true)
        } else if (editMode && !formik.errors.name) {
            setEditMode(false)
            updateProfile({
                userId,
                about: aboutInfo,
                isApplicant: values.lookingForAJob,
                description: jobInfo,
                name: values.name,
                github: values.github,
                vk: values.vk,
                facebook: values.facebook,
                instagram: values.instagram,
                twitter: values.twitter,
                website: values.website,
                youtube: values.youtube,
                mainlink: values.mainlink
            })
        }
    }

    const aboutInfo = formik.values.about === "" ? "no info" : formik.values.about
    const jobInfo = formik.values.jobDescription === "" ? "enter job description" : formik.values.jobDescription

    useEffect(() => {
        formik.setFieldValue("name", fullName)
        formik.setFieldValue("about", aboutMe)
        formik.setFieldValue("isLookingForAJob", lookingForAJob)
        formik.setFieldValue("jobDescription", lookingForAJobDescription)
    }, [fullName, aboutMe, lookingForAJob, lookingForAJobDescription])

    useEffect(() => {
        formik.setFieldValue("youtube", youtube)
        formik.setFieldValue("instagram", instagram)
        formik.setFieldValue("facebook", facebook)
        formik.setFieldValue("mainlink", mainlink)
        formik.setFieldValue("github", github)
        formik.setFieldValue("vk", vk)
        formik.setFieldValue("website", website)
        formik.setFieldValue("twitter", twitter)
    }, [youtube, instagram, facebook, mainlink, github, vk, website, twitter])

    const errors = formik.errors
    const contactClass = "profile-page-left-contact"

    const contactsData = [
        {
            id: "youtube",
            value: values.youtube,
            icon: <SiYoutube title={values.youtube}/>,
            editMode: youtubeEditMode,
            setEditMode: setYoutubeEditMode
        },
        {
            id: "vk", value: values.vk,
            icon: <SiVk title={values.vk}/>,
            editMode: vkEditMode,
            setEditMode: setVkEditMode
        },
        {id: "github", value: values.github, icon: <SiGithub title={values.github}/>},
        {id: "instagram", value: values.instagram, icon: <SiInstagram title={values.instagram}/>},
        {id: "facebook", value: values.facebook, icon: <SiFacebook title={values.facebook}/>},
        {id: "twitter", value: values.twitter, icon: <SiTwitter title={values.twitter}/>},
        {id: "website", value: values.website, icon: <CgWebsite title={values.website}/>}]

    const pointerCursor = {
        cursor: directEditMode && isCurrentUser ? "pointer" : "default"
    }

    return (
        <div className="profile-page-center-avatarBlockContainer">
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input ref={hiddenFileInput}
                           hidden={true} type={"file"}
                           onChange={uploadPhoto}/>
                    <img className="profile-page-avatar"
                         style={pointerCursor}
                         onClick={directEditMode && handleClick}
                         src={largePhoto ? largePhoto : defaultAvatar}
                         alt="large photo"/>
                    <p style={pointerCursor}
                       onClick={() => toggleProfileDataEditMode(nameEditMode, setNameEditMode)}
                       className={"profile-page-left-part-name"}>{
                        fetchPersonalData ? fetchUiSpin :
                            nameEditMode ?
                                <input style={{"border": errors.name ? "solid red thin" : "solid thin"}} type={"text"}
                                       id={"name"}
                                       className={"name-input"} onChange={formik.handleChange}
                                       value={values.name} autoFocus={true} onBlur={() =>
                                    toggleProfileDataEditMode(nameEditMode, setNameEditMode)}/> : values.name}</p>
                    {errors.name && <p className={"profile-page-input-error"}>{errors.name}</p>}
                    <Status {...[status, isCurrentUser, updateStatus, fetchStatusData]}/>
                    <div className={"profile-page-left-contacts-block"}>
                        {fetchPersonalData && fetchUiSpin}
                        {contactsData.map(contact => <span hidden={fetchPersonalData}
                                                           style={{"color": !contact.value && "gray"}}
                                                           className={`${contactClass} ${contactClass}-${contact.id}Icon`}>
                        {contact ? <Link
                            style={{"cursor": !contact.value && "default"}}
                            onClick={(e) => {
                                if (contactsBlockEditMode) {
                                    e.preventDefault()
                                    toggleOverLay({
                                        toggleRelay: true,
                                        toggleViewPort: false,
                                        index: null,
                                        contactId: contact.id,
                                        contactValue: contact.value
                                    })
                                }
                            }}
                            to={contact.value && `//${contact.value}`} target={contact.value && "_blank"}>
                            {contact.icon}</Link> : contact.icon}
                        </span>)}
                    </div>
                    {directEditMode && isCurrentUser ? <p
                        className={"direct-contact-edit-button"}
                        style={{"cursor": "pointer"}}
                        onClick={() => toggleProfileDataEditMode(contactsBlockEditMode, setContactsBlockEditMode)}>{contactsBlockEditMode ? "Choose contacts to edit" : "Edit Contacts"}</p> : null}
                </div>
            </form>
        </div>
    );
}

export default ProfileAvatarBlock;