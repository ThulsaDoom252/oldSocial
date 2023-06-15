import {apiCaller, profileApi} from "../../api/api";
import React from "react";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {delay} from "../../common/commonFuncs";
import {aboutData, isLookingForAJobData, lookingForAJobDataInfo, nameData} from "../../common/commonData";

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        currentUserAvatar: null,
        fetchStatusData: false,
        fetchUserData: false,
        aboutDataFetch: false,
        profilePageNotFound: false,
        nameDataFetch: false,
        statusDataUploadStatus: null,
        isLookingForAJobDataFetch: false,
        jobDescriptionDataFetch: false,
        profileDataUpdated: false,
        isCurrentProfileFollowed: false,
        userDataUploadStatus: null,
        aboutDataUploadStatus: null,
        nameDataUploadStatus: null,
        isLookingForAJobDataUploadStatus: null,
        jobDescriptionUploadStats: null,
        directEditMode: false,
        profile: {},
        contacts: [],
        showOverlay: false,
        showOverlayPhotoViewport: false,
        selectedPhoto: null,
        selectedContact: null,
        selectedContactId: null,
        status: '',
        errorMessage: null,
        notFound: null,
        userPhotos: ["photo-9.png", "photo-2.webp", "photo-3.webp", "photo-4.jfif", "photo-5.png", "photo-6.webp", "photo-7.jpg", "photo-8.png", "photo-9.png", "photo-10.png"]
    },
    reducers: {
        toggleStatusDataUploadStatus(state, action) {
            state.statusDataUploadStatus = action.payload
        },
        toggleStatusDataFetch(state, action) {
            state.fetchStatusData = action.payload
        },
        toggleUserDataUploadStatus(state, action) {
            state.userDataUploadStatus = action.payload
        },
        toggleAboutDataUploadStatus(state, action) {
            state.aboutDataUploadStatus = action.payload
        },
        toggleNameDataUploadStatus(state, action) {
            state.nameDataUploadStatus = action.payload
        },
        toggleJobDescriptionDataUploadStatus(state, action) {
            state.jobDescriptionUploadStatus = action.payload
        },
        toggleIsLookingForAJobDataUploadStatus(state, action) {
            state.isLookingForAJobDataUploadStatus = action.payload
        },
        toggleProfilePageNotFound(state, action) {
            state.profilePageNotFound = action.payload
        },
        changeUserAvatar(state, action) {
            const {photo} = action.payload
            state.photos = photo
            state.profile = {...state.profile, photos: photo}
        },
        toggleUserDataFetch(state, action) {
            state.fetchUserData = action.payload
        },
        toggleIsCurrentProfileFollowed(state, action) {
            state.isCurrentProfileFollowed = action.payload
        },
        toggleAboutDataFetch(state, action) {
            state.aboutDataFetch = action.payload
        },
        toggleNameDataFetch(state, action) {
            state.nameDataFetch = action.payload
        },
        toggleIsLookingForAJobDataFetch(state, action) {
            state.isLookingForAJobDataFetch = action.payload
        },
        toggleProfileDataUpdateStatus(state, action) {
            state.profileDataUpdated = action.payload
        },
        toggleJobDescriptionDataFetch(state, action) {
            state.jobDescriptionDataFetch = action.payload
        },
        setCurrentUserAvatar(state, action) {
            debugger
            state.currentUserAvatar = action.payload
        },
        setUserProfile(state, action) {
            const {profile, friends} = action.payload
            const contacts = profile.contacts
            const contactsArray = []
            state.isCurrentProfileFollowed = false
            if (friends) {
                state.isCurrentProfileFollowed = friends.some(friend => {
                    if (friend.id === profile.userId) {
                        return true
                    } else {
                        return false
                    }
                });
            }
            state.profile = profile
            state.photos = profile.photos
            Object.keys(contacts).forEach(contact => {
                contactsArray.push({id: contact, value: contacts[contact]})
            })
            state.contacts = [...contactsArray]
        },
        setStatus(state, action) {
            state.status = action.payload
        },
        setSelectedContactData(state, action) {
            state.selectedContact = action.payload
        },
        changeContactValue(state, action) {
            const {selectedContactId, selectedContact} = action.payload
            new Promise((resolve) => {
                state.contacts = state.contacts.map(contact => contact.id === selectedContactId ? {
                    ...contact,
                    value: selectedContact
                } : {...contact})
                resolve()
            }).then(() => console.log('success'))
            return void 0
        },
        toggleOverlay(state, action) {
            const {showOverlay, showPhotoViewPort, index, contactId, contactValue} = action.payload
            state.showOverlay = showOverlay
            state.showOverlayPhotoViewport = showPhotoViewPort
            state.selectedPhoto = index
            state.selectedContactId = contactId
            state.selectedContact = contactValue
        },
    },
})

export default profileSlice.reducer
export const {
    toggleAboutDataFetch,
    toggleStatusDataFetch,
    toggleStatusDataUploadStatus,
    toggleNameDataFetch,
    toggleJobDescriptionDataFetch,
    toggleIsLookingForAJobDataFetch,
    toggleNameDataUploadStatus,
    toggleAboutDataUploadStatus,
    toggleJobDescriptionDataUploadStatus,
    toggleIsLookingForAJobDataUploadStatus,
    toggleOverlay,
    toggleUserDataUploadStatus,
    setCurrentUserAvatar,
    toggleProfileDataUpdateStatus,
    setSelectedContactData,
    setUserProfile,
    setStatus,
    changeContactValue,
    changeUserAvatar,
    toggleUserDataFetch,
    toggleIsCurrentProfileFollowed,
    toggleProfilePageNotFound,
} = profileSlice.actions

//THUNKS
export const setUserThunk = createAsyncThunk('set-user-thunk', async ({
                                                                          userId,
                                                                          friends,
                                                                          profilePageNotFound
                                                                      }, {dispatch}) => {
    profilePageNotFound === true && dispatch(toggleProfilePageNotFound(false))
    dispatch(toggleUserDataFetch(true))
    dispatch(toggleProfileDataUpdateStatus(false))
    const userData = await apiCaller.setUsers(userId)
    if (userData.status === 200) {
        dispatch(setUserProfile({profile: userData.data, friends}))
        if (data.userId === userId) {
            localStorage.setItem("userId", userId)
        }
    } else {
        dispatch(toggleProfilePageNotFound(true))
    }
    dispatch(toggleUserDataFetch(false))
})

export const setStatusThunk = createAsyncThunk('get-status-thunk', async (userId, {dispatch}) => {
    const response = await profileApi.getStatus(userId)
    dispatch(setStatus(response.data))
})

export const updateStatusThunk = createAsyncThunk('updateStatus-thunk', async (status, {dispatch}) => {
    dispatch(toggleStatusDataFetch(true))
    const data = await profileApi.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setStatus(status))
        dispatch(toggleStatusDataUploadStatus(true))
        await delay(200)
        dispatch(toggleStatusDataUploadStatus(false))
    } else {
        console.log('status error')
    }
    dispatch(toggleStatusDataFetch(false))
})

export const setCurrentUserAvatarThunk = createAsyncThunk('set-avatar-thunk', async (userId, {dispatch}) => {
    const userData = await apiCaller.setUsers(userId)
    dispatch(setCurrentUserAvatar(userData.data.photos.small))
})

export const updateAvatarThunk = createAsyncThunk('update-photo-thunk', async (photo, {dispatch}) => {
    const response = await profileApi.updatePhoto(photo)
    if (response.data.resultCode === 0) {
        dispatch(changeUserAvatar({photo: response.data.data.photos}))
        dispatch(setCurrentUserAvatar(response.data.data.photos.small))
    }
})

export const updateProfileThunk = createAsyncThunk('update-profile-thunk',
    async ({
               about, isApplicant, description, name, github, vk, facebook, instagram, twitter,
               website, youtube, mainlink, fetchData,
           }, {dispatch, getState}) => {

        const state = getState();
        const {userId, aboutMe, lookingForAJob, lookingForAJobDescription, fullName} = state.profilePage.profile
        const [facebookState, websiteState, vkState, twitterState, instagramState, youtubeState, githubState, mainlinkState] = state.profilePage.contacts
        const aboutParam = about ? about : aboutMe
        const isApplicantParam = isApplicant !== undefined ? isApplicant : lookingForAJob
        const descriptionParam = description ? description : lookingForAJobDescription
        const fullNameParam = name ? name : fullName
        const githubParam = github ? github : githubState.value
        const facebookParam = facebook ? facebook : facebookState.value
        const instagramParam = instagram ? instagram : instagramState.value
        const vkParam = vk ? vk : vkState.value
        const websiteParam = website ? website : websiteState.value
        const mainLinkParam = mainlink ? mainlink : mainlinkState.value
        const youtubeParam = youtube ? youtube : youtubeState.value
        const twitterParam = twitter ? twitter : twitterState.value
        switch (fetchData) {
            case nameData:
                dispatch(toggleNameDataFetch(true))
                break;
            case aboutData:
                dispatch(toggleAboutDataFetch(true))
                break
            case isLookingForAJobData:
                dispatch(toggleIsLookingForAJobDataFetch(true))
                break;
            case lookingForAJobDataInfo:
                dispatch(toggleJobDescriptionDataFetch(true))
                break;
            default:
                dispatch(toggleUserDataFetch(true))
                break;
        }
        const response = await profileApi.updateProfile(userId, aboutParam, isApplicantParam, descriptionParam,
            fullNameParam, githubParam, vkParam, facebookParam, instagramParam, twitterParam,
            websiteParam, youtubeParam, mainLinkParam)

        if (response.data.resultCode === 0) {
            switch (fetchData) {
                case aboutData:
                    dispatch(toggleAboutDataUploadStatus(true))
                    dispatch(toggleAboutDataFetch(false))
                    await delay(200)
                    dispatch(toggleAboutDataUploadStatus(false))
                    break;
                case nameData:
                    dispatch(toggleNameDataUploadStatus(true))
                    dispatch(toggleNameDataFetch(false))
                    await delay(200)
                    dispatch(toggleNameDataUploadStatus(false))
                    break;
                case isLookingForAJobData:
                    dispatch(toggleIsLookingForAJobDataUploadStatus(true))
                    dispatch(toggleIsLookingForAJobDataFetch(false))
                    await delay(200)
                    dispatch(toggleIsLookingForAJobDataUploadStatus(false))
                    break;
                case lookingForAJobDataInfo:
                    dispatch(toggleJobDescriptionDataUploadStatus(true))
                    dispatch(toggleIsLookingForAJobDataFetch(false))
                    await delay(200)
                    dispatch(toggleJobDescriptionDataUploadStatus(false))
                    break;
                default:
                    dispatch(toggleUserDataUploadStatus(true))
                    dispatch(toggleUserDataFetch(false))
                    await delay(1000)
                    dispatch(toggleUserDataUploadStatus(false))
                    break;
            }
            dispatch(toggleProfileDataUpdateStatus(true))
        } else {
            console.log('error')
        }
        switch (fetchData) {
            case nameData:
                dispatch(toggleNameDataFetch(false))
                break;
            case isLookingForAJobData:
                dispatch(toggleIsLookingForAJobDataFetch(false))
                break;
            case lookingForAJobDataInfo:
                dispatch(toggleJobDescriptionDataFetch(false))
                break;
            case aboutData:
                dispatch(toggleAboutDataFetch(false))
                break;
            default:
                dispatch(toggleUserDataFetch(false))
                break;
        }
    }
)




