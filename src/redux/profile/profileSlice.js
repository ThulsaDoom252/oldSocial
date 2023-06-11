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
import {avatarDataFetchingAC, statusDataFetchingAC} from "../commonSlice";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    aboutData,
    isLookingForAJobData, lookingForAJobDataInfo,
    nameData,
} from "./constants";

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        currentUserAvatar: null,
        aboutDataFetch: false,
        nameDataFetch: false,
        isLookingForAJobDataFetch: false,
        jobDescriptionDataFetch: false,
        directEditMode: false,
        fetchUserData: false,
        userDataUploadStatus: null,
        aboutDataUploadStatus: null,
        nameDataUploadStatus: null,
        isLookingForAJobDataUploadStatus: null,
        jobDescriptionUploadStats: null,
        profile: {},
        contacts: [],
        showOverlay: false,
        showOverlayPhotoViewport: false,
        selectedPhoto: null,
        selectedContact: null,
        selectedContactId: null,
        name: null,
        about: null,
        applicant: null,
        description: null,
        github: null,
        vk: null,
        facebook: null,
        instagram: null,
        twitter: null,
        site: null,
        youtube: null,
        link: null,
        dataReceived: false,
        status: '',
        result: null,
        errorMessage: null,
        notFound: null,
        statusError: null,
        defaultPhotos: [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10]
    },
    reducers: {
        dataReceivedAC(state, action) {
            state.dataReceived = action.payload
        },
        statusErrorAC(state, action) {
            state.statusError = action.payload
        },
        resultAC(state, action) {
            state.result = action.payload
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
        currentUserDataAC(state, action) {
            const {
                name, about, applicant,
                description, github, vk, facebook, instagram, twitter, site, youtube, link
            } = action.payload
            state.name = name
            state.about = about
            state.applicant = applicant
            state.description = description
            state.github = github
            state.vk = vk
            state.facebook = facebook
            state.instagram = instagram
            state.twitter = twitter
            state.site = site
            state.youtube = youtube
            state.link = link
        },
    },
})

export default profileSlice.reducer
export const {
    dataReceivedAC,
    toggleAboutDataFetch,
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
    currentUserDataAC,
    setUserProfile,
    statusErrorAC,
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
    dispatch(statusDataFetchingAC(true))
    const response = await profileApi.getStatus(userId)
    dispatch(statusAC(response.data))
    dispatch(statusDataFetchingAC(false))
})

export const updateStatusTC = createAsyncThunk('updateStatus-thunk', async (status, {dispatch}) => {
    dispatch(statusDataFetchingAC(true))
    const data = await profileApi.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(statusAC(status))
        dispatch(statusErrorAC(false))
        dispatch(statusDataFetchingAC(false))
    } else {
        dispatch(statusErrorAC(true))
        setTimeout(() => {
            dispatch(statusErrorAC(false))
        }, 3000)
        dispatch(statusDataFetchingAC(false))
    }
})

export const setCurrentUserDataTC = createAsyncThunk('set-current-user-data-thunk', async (userId, {dispatch}) => {
    const data = await apiCaller.setUsers(userId)
    dispatch(currentUserDataAC(data.fullName, data.aboutMe, data.lookingForAJob, data.lookingForAJobDescription,
        data.contacts.github, data.contacts.vk, data.contacts.facebook, data.contacts.instagram, data.contacts.twitter,
        data.contacts.website, data.contacts.youtube, data.contacts.mainLink))
    dispatch(dataReceivedAC(true))
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
        const state = getState();
        const {userId, aboutMe, lookingForAJob, lookingForAJobDescription, fullName} = state.profilePage.profile
        const [facebookState, websiteState, vkState, twitterState, instagramState, youtubeState, githubState, mainlinkState] = state.profilePage.contacts
        const aboutParam = about ? about : aboutMe
        const isApplicantParam = isApplicant ? isApplicant : lookingForAJob
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
                        dispatch(toggleAboutDataUploadStatus((null)))
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




