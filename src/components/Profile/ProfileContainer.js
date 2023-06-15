import React, {useEffect, useState} from "react";
import ProfileCenterPart from "./ProfileCenterPart/ProfileCenterPart";
import {connect, useSelector} from "react-redux";
import {
    setStatusThunk,
    setUserThunk,
    toggleOverlay,
    updateProfileThunk,
    updateStatusThunk,
    updateAvatarThunk,
    toggleIsCurrentProfileFollowed,
} from "../../redux/profile/profileSlice";
import ProfileLeftPart from "./LeftPart";
import ProfileRightPart from "./RightPart";
import {followUserThunk, unfollowFriendThunk, unFollowUserThunk} from "../../redux/userSlice";
import * as Yup from "yup";
import {useFormik} from "formik";
import {getContactIcon} from "../../common/commonFuncs";
import {aboutData, isLookingForAJobData} from "../../common/commonData";

const ProfileContainer = ({
                              updateProfileThunk,
                              toggleOverlay,
                              userIdRouterParam,
                              unfollowFriendThunk,
                              updateStatusThunk,
                              updatePhotoThunk,
                              followUserThunk,
                              toggleIsCurrentProfileFollowed,
                          }) => {

    const aboutDataFetch = useSelector(state => state.profilePage.aboutDataFetch)
    const nameDataFetch = useSelector(state => state.profilePage.nameDataFetch)
    const isLookingForAJobDataFetch = useSelector(state => state.profilePage.isLookingForAJobDataFetch)
    const jobDescriptionDataFetch = useSelector(state => state.profilePage.jobDescriptionDataFetch)
    const followUserFetch = useSelector(state => state.usersPage.followUserFetch)

    const aboutDataUploadStatus = useSelector(state => state.profilePage.aboutDataUploadStatus)
    const nameDataUploadStatus = useSelector(state => state.profilePage.nameDataUploadStatus)
    const isLookingForAJobDataUploadStatus = useSelector(state => state.profilePage.isLookingForAJobDataUploadStatus)
    const jobDescriptionDataUploadStatus = useSelector(state => state.profilePage.jobDescriptionUploadStatus)

    const currentUserId = useSelector(state => state.auth.id)
    const email = useSelector(state => state.auth.email)
    const profile = useSelector(state => state.profilePage.profile)
    const userPhotos = useSelector(state => state.profilePage.userPhotos)
    const status = useSelector(state => state.profilePage.status)
    const notFound = useSelector(state => state.profilePage.notFound)
    const friends = useSelector(state => state.usersPage.friends)
    const directEditMode = useSelector(state => state.settings.directEditMode)
    const showMobileVersion = useSelector(state => state.settings.showMobileVersion)
    const nightMode = useSelector(state => state.settings.nightMode)
    const fetchStatusData = useSelector(state => state.profilePage.fetchStatusData)
    const statusDataUploadStatus = useSelector(state => state.profilePage.statusDataUploadStatus)
    const profileInitialized = useSelector(state => state.app.profileInitialized)
    const contactsArray = useSelector(state => state.profilePage.contacts)
    const isCurrentProfileFollowed = useSelector(state => state.profilePage.isCurrentProfileFollowed)

    const defaultAvatar = require("../common/default-avatar.jfif")

    const userIdRouterParamNumber = parseInt(userIdRouterParam)
    const isCurrentUsersPage = userIdRouterParamNumber === currentUserId

    const [nameEditMode, setNameEditMode] = useState(false)
    const [contactsBlockEditMode, setContactsBlockEditMode] = useState(false)

    const {
        userId,
        fullName,
        aboutMe,
        photos: {large: largePhoto, small: smallPhoto},
        contacts: {youtube, instagram, github, vk, website, twitter, facebook}
    } = profile


    //Common
    const pointerCursor = {
        cursor: directEditMode && isCurrentUsersPage ? "pointer" : "default"
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
        if (!editMode && directEditMode) {
            setEditMode(true)
        } else if (editMode === true && !errors.about) {
            setEditMode(false)
            updateProfileThunk({
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
        aboutEditMode, setAboutEditMode, email, toggleAboutEditMode, aboutBlockStyle, aboutDataFetch]
    const commonProps = [isCurrentUsersPage, pointerCursor, nightMode, currentUserId, notFound, directEditMode]

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
            updateStatusThunk(statusValue)
        } else if (!statusEditMode && isCurrentUsersPage) {
            setStatusEditMode(true)
        }
    }
    const statusProps = [status, statusEditMode, statusValue, statusLengthError, handleChangeStatus,
        toggleStatusEdit, pointerCursor, fetchStatusData, statusDataUploadStatus]

    ////////// Avatar & contacts block
    const hiddenFileInput = React.useRef(null);
    const uploadPhoto = (e) => updatePhotoThunk(e.target.files[0])
    const handleAvatarClick = () => isCurrentUsersPage ? hiddenFileInput.current.click() : void 0;
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
            fullName: Yup.string().required("Name is required"),
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
        if (!editMode && isCurrentUsersPage && directEditMode) {
            setEditMode(true)
        } else if (editMode && !avatarBlockFormik.errors.name) {
            setEditMode(false)
            updateProfileThunk({
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
            toggleOverlay({
                showOverlay: true,
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

    const handleFollowUser = async ({isCurrentProfileFollowed, friendIdParam}) => {
        if (!isCurrentProfileFollowed && !friendIdParam) {
            await followUserThunk({
                userId,
                userData: {
                    followed: true,
                    id: userId,
                    name: fullName,
                    status,
                    photos: {large: largePhoto, small: smallPhoto}
                }
            })
        } else {
            await unfollowFriendThunk({friendId: friendIdParam ? friendIdParam : userId})
        }
        toggleIsCurrentProfileFollowed(friendIdParam ? false : !isCurrentProfileFollowed)

    }

    const profileAvatarProps = [avatarBlockFormik.handleSubmit, avatarBlockFormik.handleChange, uploadPhoto,
        handleAvatarClick, nameEditMode, setNameEditMode, contactsBlockEditMode, setContactsBlockEditMode,
        avatarBlockFormik.values, avatarBlockFormik.errors, toggleAvatarBlockEditMode,
        handleContactBlockEditMode, contactsData, pointerCursor, hiddenFileInput, largePhoto, nameDataFetch,
        nameDataUploadStatus, handleFollowUser, isCurrentProfileFollowed, followUserFetch, userId]

    /////////////Profile Data
    const {lookingForAJob, lookingForAJobDescription: description} = profile
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
        if (isCurrentUsersPage && !editMode && directEditMode) {
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
        updateProfileThunk({
            about: dataValues.about,
            isApplicant,
            description: dataValues.applicantDescription,
            name: fullName,
            fetchData,
        })
    }

    const directEditFunc = isCurrentUsersPage && directEditMode

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

    //Right Part
    const handleSelectedPhoto = (index) => {
        toggleOverlay({showOverlay: true, showPhotoViewPort: true, index})
    }


    return (
        <div className={"profile-main-container"}>
            {!showMobileVersion &&
                <ProfileLeftPart {...{profileLeftPartProps, commonProps}}/>}
            <ProfileCenterPart  {...{
                fullName, largePhoto, isCurrentUser: isCurrentUsersPage, notFound, directEditMode, defaultAvatar,
                userPhotos, showOverlayAC: toggleOverlay, friends, nightMode,
                updatePhotoTC: updatePhotoThunk, showMobileVersion, profileAvatarProps, statusProps,
                profileDataProps,
            }}/>
            {!showMobileVersion &&
                <ProfileRightPart {...{
                    defaultAvatar, friends, userPhotos, handleSelectedPhoto,
                    nightMode, followUserFetch, userId, handleFollowUser
                }}/>}
        </div>
    )
}

export default connect(
    null,
    {
        setUserThunk,
        setStatusThunk,
        toggleOverlay,
        toggleIsCurrentProfileFollowed,
        updateProfileThunk,
        updateStatusThunk,
        followUserThunk,
        unFollowUserThunk,
        unfollowFriendThunk,
        updateAvatarThunk,
    }
)(ProfileContainer);

