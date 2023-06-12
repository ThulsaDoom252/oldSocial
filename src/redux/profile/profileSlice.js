import {apiCaller, profileApi} from "../../api/api";
import photo1 from "./photo-1.jpeg"
import photo2 from "./photo-2.webp"
import photo3 from "./photo-3.webp"
import photo4 from "./photo-4.jfif"
import photo5 from "./photo-5.png"
import photo6 from "./photo-6.webp"
import photo7 from "./photo-7.jpg"
import photo8 from "./photo-8.png"
import photo9 from "./photo-9.png"
import photo10 from "./photo-10.png"
import React from "react";
import {avatarDataFetchingAC} from "../commonSlice";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    aboutData,
    isLookingForAJobData, lookingForAJobDataInfo,
    nameData,
} from "./constants";
import {delay} from "../commonRefs";

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        currentUserAvatar: null,
        fetchStatusData: false,
        fetchUserData: false,
        aboutDataFetch: false,
        nameDataFetch: false,
        statusDataUploadStatus: null,
        isLookingForAJobDataFetch: false,
        jobDescriptionDataFetch: false,
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
        userPhotos: [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10]
    },
    reducers: {
        toggleStatusDataUploadStatus(state, action) {
            state.statusDataUploadStatus = action.payload
        },
        toggleStatusDataFetch(state, action) {
            state.fetchStatusData = action.payload
        },
        notFoundAC(state, action) {
            state.notFound = action.payload
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
        photoAC(state, action) {
            const {photo} = action.payload
            state.photos = photo
            state.profile = {...state.profile, photos: photo}
        },
        toggleUserDataFetch(state, action) {
            state.fetchUserData = action.payload
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
        toggleJobDescriptionDataFetch(state, action) {
            state.jobDescriptionDataFetch = action.payload
        },
        avatarAC(state, action) {
            state.currentUserAvatar = action.payload
        },
        setUserProfile(state, action) {
            const {profile} = action.payload
            const contacts = profile.contacts
            const contactsArray = []
            state.profile = profile
            state.photos = profile.photos
            Object.keys(contacts).forEach(contact => {
                contactsArray.push({id: contact, value: contacts[contact]})
            })
            state.contacts = [...contactsArray]
        },
        statusAC(state, action) {
            state.status = action.payload
        },
        changeCurrentContactDataAC(state, action) {
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
        showOverlayAC(state, action) {
            const {toggleRelay, toggleViewPort, index, contactId, contactValue} = action.payload
            state.showOverlay = toggleRelay
            state.showOverlayPhotoViewport = toggleViewPort
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
    showOverlayAC,
    notFoundAC,
    toggleUserDataUploadStatus,
    avatarAC,
    changeCurrentContactDataAC,
    setUserProfile,
    statusAC,
    changeContactValue,
    photoAC,
    toggleUserDataFetch,
} = profileSlice.actions

//THUNKS


export const setUserTC = createAsyncThunk('set-user-thunk', async (userId, {dispatch}) => {
    try {
        dispatch(toggleUserDataFetch(true))
        const data = await apiCaller.setUsers(userId)
        dispatch(setUserProfile({profile: data}))
        if (data.userId === userId) {
            localStorage.setItem("userId", userId)
        }
        dispatch(notFoundAC(false))
    } catch (error) {
        dispatch(notFoundAC(true))
    }
    dispatch(toggleUserDataFetch(false))
})

export const getStatusTC = createAsyncThunk('get-status-thunk', async (userId, {dispatch}) => {
    const response = await profileApi.getStatus(userId)
    dispatch(statusAC(response.data))
})

export const updateStatusTC = createAsyncThunk('updateStatus-thunk', async (status, {dispatch}) => {
    dispatch(toggleStatusDataFetch(true))
    const data = await profileApi.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(statusAC(status))
        dispatch(toggleStatusDataUploadStatus(true))
        await delay(200)
        dispatch(toggleStatusDataUploadStatus(false))
    } else {
        console.log('status error')
    }
    dispatch(toggleStatusDataFetch(false))
})

export const setAvatarTC = createAsyncThunk('set-avatar-thunk', async (userId, {dispatch}) => {
    dispatch(avatarDataFetchingAC(true))
    const data = await apiCaller.setUsers(userId)
    dispatch(avatarAC(data.photos.small))
    dispatch(avatarDataFetchingAC(false))
})

export const updatePhotoTC = createAsyncThunk('update-photo-thunk', async (photo, {dispatch}) => {
    dispatch(avatarDataFetchingAC(true))
    const response = await profileApi.updatePhoto(photo)
    if (response.data.resultCode === 0) {
        dispatch(photoAC({photo: response.data.data.photos}))
        dispatch(avatarAC(response.data.data.photos.small))
        dispatch(avatarDataFetchingAC(false))
    }
})


// userid, aboutMe, lookingForAJob,
//     LookingForAJobDescription, fullName, contacts: {
//     github, vk, facebook, instagram, twitter,
//         website, youtube, mainLink

export const updateProfileTC = createAsyncThunk('update-profile-thunk',
    async ({
               about, isApplicant, description, name, github, vk, facebook, instagram, twitter,
               website, youtube, mainlink, fetchData,
           }, {dispatch, getState}) => {
        debugger
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
                    break;
                case nameData:
                    dispatch(toggleNameDataUploadStatus(true))
                    break;
                case isLookingForAJobData:
                    dispatch(toggleIsLookingForAJobDataUploadStatus(true))
                    break;
                case lookingForAJobDataInfo:
                    dispatch(toggleJobDescriptionDataUploadStatus(true))
                    break;
                default:
                    dispatch(toggleUserDataUploadStatus(true))
                    break;
            }

            setTimeout(() => {
                switch (fetchData) {
                    case aboutData:
                        dispatch(toggleAboutDataUploadStatus(null))
                        break;
                    case nameData:
                        dispatch(toggleNameDataUploadStatus(null))
                        break;
                    case isLookingForAJobData:
                        dispatch(toggleIsLookingForAJobDataUploadStatus(null))
                        break;
                    case lookingForAJobDataInfo:
                        dispatch(toggleJobDescriptionDataUploadStatus(null))
                        break;
                    default:
                        dispatch(toggleUserDataUploadStatus(null))
                        break;
                }

            }, 200)
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




