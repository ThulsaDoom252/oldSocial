import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik'
import * as Yup from "yup";
import {connect, useDispatch} from "react-redux";
import {setUserTC, updatePhotoTC, updateProfileTC} from "../../../../redux/profile/profileSlice";
import authHoc from "../../../HOC/authHoc";

function EditProfileData({
                             auth,
                             contacts: {facebook, instagram, youtube, github, vk, twitter, mainlink, website},
                             currentId: userId,
                             email,
                             photos: {large: largePhoto},
                             profile: {
                                 fullName,
                                 aboutMe,
                                 lookingForAJob: applicant,
                                 lookingForAJobDescription: description
                             },
                             setUserTC: setUser,
                             updatePhotoTC: updatePhoto,
                             updateProfileTC: updateProfile,
                         }) {

    useEffect(() => {
        setUserTC(userId)
    }, [])

    const hiddenFileInput = React.useRef(null);

    let uploadPhoto = (e) => {
        updatePhoto(e.target.files[0])
    }
    const handleClick = event => hiddenFileInput.current.click()

    let [nameHook, setNameHook] = useState(fullName)
    let [aboutHook, setAboutHook] = useState(aboutMe)
    let [applicantHook, setApplicantHook] = useState(applicant)
    let [descriptionHook, setDescriptionHook] = useState(description)
    let [websiteHook, setWebsiteHook] = useState(website)
    let [youtubeHook, setYoutubeHook] = useState(youtube)
    let [instagramHook, setInstagramHook] = useState(instagram)
    let [facebookHook, setFacebookHook] = useState(facebook)
    let [gitHubHook, setGitHubHook] = useState(github)
    let [mainlinkHook, setMainlinkHook] = useState(mainlink)
    let [vkHook, setVkHook] = useState(vk)
    let [twitterHook, setTwitterHook] = useState(twitter)

    useEffect(() => {
        setNameHook(fullName)
        setAboutHook(aboutMe)
        setApplicantHook(applicant)
        setDescriptionHook(description)
        setWebsiteHook(website)
        setYoutubeHook(youtube)
        setInstagramHook(instagram)
        setFacebookHook(facebook)
        setGitHubHook(github)
        setMainlinkHook(mainlink)
        setVkHook(vk)
        setTwitterHook(twitter)
    }, [fullName, aboutMe, applicant, description, website, youtube, instagram, facebook, github, mainlink, twitter, vk])


    const urlError = Yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Enter correct url!').nullable()
    const {handleSubmit, handleChange, values, touched, errors} = useFormik({
        initialValues: {
            name: nameHook,
            about: aboutHook,
            isApplicant: applicantHook,
            description: descriptionHook,
            website: websiteHook,
            vk: vkHook,
            facebook: facebookHook,
            twitter: twitterHook,
            instagram: instagramHook,
            github: gitHubHook,
            mainlink: mainlinkHook,
            youtube: youtubeHook,

        },
        validationSchema: Yup.object({
            name: Yup.string().min(3, 'Name must be longer than 3 characters').required(),
            about: Yup.string().min(3, 'Must contain more than 3 characters!').required(),
            description: Yup.string().min(3, 'Description must contain more than 3 characters!').nullable().required(),

        }),
        onSubmit: ({
                       name,
                       about,
                       isApplicant,
                       description,
                       website,
                       vk,
                       facebook,
                       twitter,
                       instagram,
                       youtube,
                       github,
                       mainlink
                   }) => {
            updateProfile(userId, about, isApplicant, description, name, github, vk, facebook, instagram,
                twitter, website, youtube, mainlink
            )
        }
    })


    const contactsData = [{value: values.youtube, id: "youtube", icon: null, change: handleChange},
        {value: values.instagram, id: "instagram", icon: null, change: handleChange, error: errors.instagram},
        {value: values.facebook, id: "facebook", icon: null, change: handleChange, error: errors.facebook},
        {value: values.vk, id: "vk", icon: null, change: handleChange, error: errors.vk},
        {value: values.twitter, id: "twitter", icon: null, change: handleChange, error: errors.twitter},
        {value: values.github, id: "github", icon: null, change: handleChange, error: errors.github},
        {value: values.website, id: "website", icon: null, change: handleChange, error: errors.website},
    ]
    return (
        <form onSubmit={handleSubmit}>
            <div className={"edit-profile-page-container"}>
                <div className={"edit-profile-avatar-part"}>
                    <p style={{"font-size": "1.2rem"}}>Edit Photo</p>
                    <img className={"edit-profile-avatar"} src={largePhoto} alt="edit-avatar"/>
                    <input ref={hiddenFileInput}
                           hidden={true} type={"file"}
                           onChange={uploadPhoto}/>
                    <button type="button" className={"upload-avatar-button"} onClick={handleClick}>Upload photo</button>
                    <p className={"edit-profile-email"}>{email}</p>
                </div>
                <div className={"edit-profile-data-part"}>
                    <p className={"edit-profile-title"}>Edit Profile</p>
                    <div className="edit-profile-mobile-avatar-block">
                        <img className={"edit-profile-avatar"} src={largePhoto} alt="avatar-edit-mobile"/>
                        <input ref={hiddenFileInput}
                               hidden={true} type={"file"}
                               onChange={uploadPhoto}/>
                        <button type="button" className={"upload-avatar-button"} onClick={handleClick}>Upload photo
                        </button>
                    </div>
                    <div className={"data-first-block"}>
                        <div className={"data-name-block"}>
                            <input id={"name"} type="text" className={"edit-profile-input"} placeholder={"Name"}
                                   onChange={handleChange} value={values.name}/>
                            <p className={"data-first-block-errors"}>
                                <span>{errors.name}</span>
                            </p>
                        </div>
                        <div className={"data-about-block"}>
                            <input id={"about"} type="text"
                                   className={"edit-profile-input"}
                                   placeholder={"About info"}
                                   onChange={handleChange}
                                   value={values.about}/>
                            <p className={"data-first-block-errors"}>
                                <span>{errors.about}</span>
                            </p>
                        </div>
                    </div>
                    <div className={"data-second-block"}>
                        <div className={"edit-profile-checkbox-block"}>
                            <span className={"applicant-label"}>Are you looking for a job?</span>
                            <input id={"isApplicant"} type="checkbox" checked={values.isApplicant === true}
                                   onChange={handleChange} value={values.isApplicant}/>
                        </div>
                        <div className={"edit-profile-job-description-block"} hidden={values.isApplicant === false}>
                            <p className={"job-description-label"}>Enter job description</p>
                            <input id={"description"} type="text"
                                   className={"edit-profile-job-description-input"}
                                   placeholder={"enter a job description"}
                                   onChange={handleChange}
                                   value={values.description}/>
                            <p className={"edit-profile-job-description-error"}>
                                <span>
                                    {errors.description}
                                </span>
                            </p>
                            <div className={"edit-profile-mobile-contacts-container"}>
                                <p>Your contacts</p>
                                <div className="edit-profile-mobile-contacts-block">
                                    {contactsData.map(contact => <input id={contact.id} onChange={contact.change}
                                                                        className={"edit-profile-mobile-contact-input"}
                                                                        type={"text"} value={contact.value}
                                                                        placeholder={`${contact.id} url`}/>)}
                                </div>
                            </div>


                        </div>
                        <button className={"edit-profile-page-submit-button"} type={"submit"}
                                onSubmit={handleSubmit}>Submit...
                        </button>
                    </div>
                </div>
                <div className={"edit-profile-contacts-part"}>
                    <p className={"edit-profile-contact-title"}>Edit your Contacts</p>
                    <div className={"edit-profile-page-contacts"}>
                        {contactsData.map(contact =>
                            <div className={"edit-profile-contact-block"}>
                                <p className={"edit-profile-contact-label"}>{contact.id}</p>
                                <input id={contact.id} onChange={contact.change}
                                       className={"edit-profile-contact-input"}
                                       type="text" value={contact.value}
                                       placeholder={`${contact.id} url`}
                                />
                                <div className={"contact-error-container"}>
                                    <p className={"contact-error"}>{contact.error}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}

let mapStateToProps = (state) => {
    return {
        email: state.auth.email,
        contacts: state.profilePage.contacts,
        photos: state.profilePage.photos,
        auth: state.auth.isLogged,
        currentId: state.auth.id,
        profile: state.profilePage.profile,
    }
}

export default connect(mapStateToProps, {
    setUserTC, updateProfileTC, updatePhotoTC
})(authHoc(EditProfileData));