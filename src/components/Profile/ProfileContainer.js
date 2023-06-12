import React, {useEffect, useState} from "react";
import ProfileCenterPart from "./ProfileCenterPart/ProfileCenterPart";
import {connect, useSelector} from "react-redux";
import {
    getStatusTC,
    setUserTC, showOverlayAC, updateProfileTC, updateStatusTC, updatePhotoTC,
} from "../../redux/profile/profileSlice";
import ProfileLeftPart from "./LeftPart";
import ProfileRightPart from "./RightPart";
import {getFriendsTC, unfollowFriendTC} from "../../redux/userSlice";
import * as Yup from "yup";
import {useFormik} from "formik";
import {getContactIcon} from "../../redux/profile/contactsRef";
import {aboutData, isLookingForAJobData} from "../../redux/profile/constants";

const ProfileContainer = (props) => {
    const {
        updateProfileTC,
        showOverlayAC,
        getFriendsTC,
        userIdRouterParam,
        unfollowFriendTC,
        updateStatusTC,
        updatePhotoTC,
    } = props

    const aboutDataFetch = useSelector(state => state.profilePage.aboutDataFetch)
    const nameDataFetch = useSelector(state => state.profilePage.nameDataFetch)
    const isLookingForAJobDataFetch = useSelector(state => state.profilePage.isLookingForAJobDataFetch)
    const jobDescriptionDataFetch = useSelector(state => state.profilePage.jobDescriptionDataFetch)

    const aboutDataUploadStatus = useSelector(state => state.profilePage.aboutDataUploadStatus)
    const nameDataUploadStatus = useSelector(state => state.profilePage.nameDataUploadStatus)
    const isLookingForAJobDataUploadStatus = useSelector(state => state.profilePage.isLookingForAJobDataUploadStatus)
    const jobDescriptionDataUploadStatus = useSelector(state => state.profilePage.jobDescriptionUploadStatus)

    useEffect(() => {
        aboutDataFetch && console.log(aboutDataFetch)
    }, [aboutDataFetch])
    const userId = useSelector(state => state.auth.id)
    const email = useSelector(state => state.auth.email)
    const profile = useSelector(state => state.profilePage.profile)
    const userPhotos = useSelector(state => state.profilePage.userPhotos)
    const status = useSelector(state => state.profilePage.status)
    const notFound = useSelector(state => state.profilePage.notFound)
    const defaultAvatar = useSelector(state => state.dialogsPage.defaultAvatar)
    const friends = useSelector(state => state.usersPage.friends)
    const directEditMode = useSelector(state => state.settings.directEditMode)
    const hideProfileWall = useSelector(state => state.settings.hideProfileWall)
    const showMobileVersion = useSelector(state => state.settings.showMobileVersion)
    const hideEmail = useSelector(state => state.settings.hideEmail)
    const nightMode = useSelector(state => state.settings.nightMode)
    const fetchPersonalData = useSelector(state => state.common.fetchPersonalData)
    const fetchStatusData = useSelector(state => state.profilePage.fetchStatusData)
    const statusDataUploadStatus = useSelector(state => state.profilePage.statusDataUploadStatus)
    const profileInitialized = useSelector(state => state.app.profileInitialized)
    const contactsArray = useSelector(state => state.profilePage.contacts)

    const isCurrentUser = userIdRouterParam === userId.toString()

    const [nameEditMode, setNameEditMode] = useState(false)
    const [contactsBlockEditMode, setContactsBlockEditMode] = useState(false)

    useEffect(() => {
        if (isCurrentUser) {
            getFriendsTC(100)
        }
    }, [])

    const {
        fullName,
        aboutMe,
        photos: {large: largePhoto},
        contacts: {youtube, instagram, github, vk, website, twitter, facebook}
    } = profile


    //Common
    const pointerCursor = {
        cursor: directEditMode && isCurrentUser ? "pointer" : "default"
    }

    ///////////////// Left Part
    const [aboutEditMode, setAboutEditMode] = useState(false)

    const aboutFormik = useFormik({
        initialValues: {
            aboutMe
        },

        validationSchema: Yup.object({
            aboutMe: Yup.string().min(4, 'Info must contain more than 3 characters!')
                .max(100, "info must contain less than 100 characters").nullable(),
        }),
    })

    const {values, errors} = aboutFormik
    const toggleAboutEditMode = (editMode, setEditMode) => {
        if (isCurrentUser && !editMode && directEditMode) {
            setEditMode(true)
        } else if (editMode === true && !errors.about) {
            setEditMode(false)
            updateProfileTC({
                about: values.aboutMe ? values.aboutMe : "no info",
                fetchData: aboutData
            })
        }
    }
    const aboutBlockStyle = {
        "border": errors.about ? "solid red" : aboutEditMode && !errors.about ? "solid thin" : null,
        backgroundColor: aboutDataUploadStatus ? "rgba(26, 255, 187, 0.5)" : null,
        transition: "backgroundColor 150ms ease-out"
    }

    const profileLeftPartProps = [aboutFormik.values, aboutFormik.errors, aboutFormik.handleChange,
        aboutEditMode, setAboutEditMode, email, toggleAboutEditMode, aboutBlockStyle, hideEmail, aboutDataFetch]
    const commonProps = [isCurrentUser, pointerCursor, nightMode, userId, notFound]

    //////Status block
    const [statusEditMode, setStatusEditMode] = useState(false)
    const [statusValue, setStatusValue] = useState(status)
    const statusLengthError = statusValue !== null && statusValue.length > 300
    const handleChangeStatus = (e) => {
        setStatusValue(e.currentTarget.value)
    }
    useEffect(() => {
        setStatusValue(status)
    }, [status])

    const toggleStatusEdit = () => {
        if (statusEditMode) {
            setStatusEditMode(false)
            updateStatusTC(statusValue)
        } else if (!statusEditMode && isCurrentUser) {
            setStatusEditMode(true)
        }
    }
    const statusProps = [status, statusEditMode, statusValue, statusLengthError, handleChangeStatus,
        toggleStatusEdit, pointerCursor, fetchStatusData, statusDataUploadStatus]

    ////////// Avatar & contacts block
    const hiddenFileInput = React.useRef(null);
    const uploadPhoto = (e) => updatePhotoTC(e.target.files[0])
    const handleAvatarClick = () => isCurrentUser ? hiddenFileInput.current.click() : void 0;
    const contactUrlError = Yup.string().matches(/((https?):\/\/)?(www.)?[a-z\d]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z\d#]+)*\/?(\?[a-zA-Z\d-_]+=[a-zA-Z\d-%]+&?)?$/, 'Enter correct url!').nullable()
    const avatarBlockFormik = useFormik({
        initialValues: {
            fullName,
            aboutMe,
            website,
            vk,
            facebook,
            twitter,
            instagram,
            github,
            youtube,
        },

        validationSchema: Yup.object({
            fullName: Yup.string().required(),
            vk: contactUrlError,
            facebook: contactUrlError,
            instagram: contactUrlError,
            twitter: contactUrlError,
            website: contactUrlError,
            youtube: contactUrlError,
            github: contactUrlError,
        }),
    })

    const avatarBlockFormikValues = avatarBlockFormik.values

    const toggleAvatarBlockEditMode = (editMode, setEditMode, fetchData) => {
        if (!editMode && isCurrentUser && directEditMode) {
            setEditMode(true)
        } else if (editMode && !avatarBlockFormik.errors.name) {
            setEditMode(false)
            updateProfileTC({
                name: avatarBlockFormikValues.fullName,
                github: avatarBlockFormikValues.github,
                vk: avatarBlockFormikValues.vk,
                facebook: avatarBlockFormikValues.facebook,
                instagram: avatarBlockFormikValues.instagram,
                twitter: avatarBlockFormikValues.twitter,
                website: avatarBlockFormikValues.website,
                youtube: avatarBlockFormikValues.youtube,
                fetchData
            })
        }
    }


    const handleContactBlockEditMode = (e, contactId, contactValue) => {
        if (contactsBlockEditMode) {
            e.preventDefault()
            showOverlayAC({
                toggleRelay: true,
                toggleViewPort: false,
                index: null,
                contactId,
                contactValue
            })
        }
    }

    const contactsData = profileInitialized ? contactsArray.map(contact => {
        const icon = getContactIcon(contact.id, avatarBlockFormikValues)
        const value = avatarBlockFormikValues[contact.id]
        return {...contact, value, icon}
    }) : []

    const profileAvatarProps = [avatarBlockFormik.handleSubmit, avatarBlockFormik.handleChange, uploadPhoto,
        handleAvatarClick, nameEditMode, setNameEditMode, contactsBlockEditMode, setContactsBlockEditMode,
        avatarBlockFormik.values, avatarBlockFormik.errors, toggleAvatarBlockEditMode,
        handleContactBlockEditMode, contactsData, pointerCursor, hiddenFileInput, largePhoto, nameDataFetch, nameDataUploadStatus]

    /////////////Profile Data
    const {lookingForAJob: applicant, lookingForAJobDescription: description} = profile
    const {lookingForAJob} = profile
    const [descriptionEditMode, setDescriptionEditMode] = useState(false)
    const [centerProfileAboutEditMode, setCenterProfileAboutEditMode] = useState(false)
    const profileFormik = useFormik({
        initialValues: {
            lookingForAJob,
            applicantDescription: description,
            about: aboutMe,
        },
    })

    const {values: dataValues} = profileFormik

    const toggleProfileDataEditMode = (editMode, setEditMode, fetchData) => {
        if (isCurrentUser && !editMode && directEditMode) {
            setEditMode(true)
        } else if (editMode && !errors.description) {
            setEditMode(false)
            handleUpdateProfileData(fetchData)
        }
    }

    const handleChangeIsLookingForAJobInfo = (isApplicant) => {
        profileFormik.setFieldValue("lookingForAJob", isApplicant)
        handleUpdateProfileData(isLookingForAJobData, isApplicant)
    }

    const handleUpdateProfileData = (fetchData, isApplicant = dataValues.lookingForAJob) => {
        updateProfileTC({
            about: dataValues.about,
            isApplicant,
            description: dataValues.applicantDescription,
            name: fullName,
            fetchData,
        })
    }


    const directEditFunc = isCurrentUser && directEditMode

    const jobDescriptionStyle = {
        "border": errors.applicantDescription ? "solid red" : descriptionEditMode && !errors.applicantDescription ? "solid yellow" : null,
        backgroundColor: jobDescriptionDataUploadStatus ? "rgba(26, 255, 187, 0.5)" : null,
        transition: "backgroundColor 150ms ease-out"
    }

    const profileDataProps = [profileFormik.handleChange, profileFormik.values, profileFormik.errors, toggleProfileDataEditMode,
        descriptionEditMode, setDescriptionEditMode, centerProfileAboutEditMode, setCenterProfileAboutEditMode,
        directEditFunc, jobDescriptionStyle, pointerCursor, aboutBlockStyle,
        isLookingForAJobDataFetch, isLookingForAJobDataUploadStatus, jobDescriptionDataFetch, jobDescriptionDataUploadStatus,
        handleChangeIsLookingForAJobInfo
    ]

    return (
        <div className={"profile-main-container"}>
            {!showMobileVersion &&
                <ProfileLeftPart {...{profileLeftPartProps, commonProps}}/>}
            <ProfileCenterPart  {...{
                fullName, largePhoto, isCurrentUser, notFound, directEditMode, defaultAvatar,
                userPhotos, showOverlayAC, friends, nightMode, hideProfileWall,
                updatePhotoTC, showMobileVersion, fetchPersonalData, profileAvatarProps, statusProps,
                profileDataProps,
            }}/>
            {!showMobileVersion &&
                <ProfileRightPart {...{
                    defaultAvatar, friends, userPhotos, showOverlayAC,
                    unfollowFriendTC, nightMode,
                }}/>}
        </div>
    )
}

export default connect(
    null,
    {
        setUserTC,
        getStatusTC,
        showOverlayAC,
        getFriendsTC,
        updateProfileTC,
        updateStatusTC,
        unfollowFriendTC,
        updatePhotoTC,
    }
)(ProfileContainer);

