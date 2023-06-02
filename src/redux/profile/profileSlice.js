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
import {avatarDataFetchingAC, personalDataFetchingAC, statusDataFetchingAC} from "../commonSlice";
import {createSlice} from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: 'auth-slice',
    initialState: {
        avatar: null,
        avatarLarge: null,
        directEditMode: true,
        profile: '',
        contacts: '',
        showOverlay: false,
        showOverlayPhotoViewport: false,
        selectedPhoto: null,
        selectedContact: null,
        selectedContactId: null,
        currentUserAvatar: null,
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
        photoAC(state, action) {
            const {photo} = action.payload
            state.photos = photo
            state.profile = {...state.profile, photos: photo}
        },
        avatarAC(state, action) {
            state.avatar = action.payload
        },
        setUserProfile(state, action) {
            const {profile} = action.payload
            state.profile = profile
            state.photos = profile.photos
            state.contacts = profile.contacts
        },
        statusAC(state, action) {
            state.status = action.payload
        },
        changeCurrentContactDataAC(state, action) {
            state.selectedContact = action.payload
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
                name,
                about,
                applicant,
                description,
                github,
                vk,
                facebook,
                instagram,
                twitter,
                site,
                youtube,
                link
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
    showOverlayAC,
    notFoundAC,
    avatarAC,
    changeCurrentContactDataAC,
    currentUserDataAC,
    resultAC,
    setUserProfile,
    statusErrorAC,
    statusAC,
    photoAC
} = profileSlice.actions

//THUNKS
export const setUserTC = (userId) => {
    return async (dispatch) => {
        try {
            await dispatch(personalDataFetchingAC(true))
            const data = await apiCaller.setUsers(userId)
            dispatch(setUserProfile({profile: data}))
            dispatch(notFoundAC(false))
            dispatch(personalDataFetchingAC(false))
        } catch (error) {
            dispatch(notFoundAC(true))
        }
    }
}

export const getStatusTC = (userId) => async (dispatch) => {
    dispatch(statusDataFetchingAC(true))
    const response = await profileApi.getStatus(userId)
    dispatch(statusAC(response.data))
    dispatch(statusDataFetchingAC(false))
}

export const updateStatusTC = (status) => async (dispatch) => {
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
}

export const setCurrentUserDataTC = (userId) => async (dispatch) => {
    const data = await apiCaller.setUsers(userId)
    dispatch(currentUserDataAC(data.fullName, data.aboutMe, data.lookingForAJob, data.lookingForAJobDescription,
            data.contacts.github, data.contacts.vk, data.contacts.facebook, data.contacts.instagram, data.contacts.twitter,
            data.contacts.website, data.contacts.youtube, data.contacts.mainLink),
        dispatch(dataReceivedAC(true))
    )
}

export const setAvatarTC = (userId) => async (dispatch) => {
    dispatch(avatarDataFetchingAC(true))
    const data = await apiCaller.setUsers(userId)
    dispatch(avatarAC(data.photos.small))
    dispatch(avatarDataFetchingAC(false))
}

export const updatePhotoTC = (photo) => async (dispatch) => {
    dispatch(avatarDataFetchingAC(true))
    const response = await profileApi.updatePhoto(photo)

    if (response.data.resultCode === 0) {
        dispatch(photoAC({photo: response.data.data.photos}))
        dispatch(avatarAC(response.data.data.photos.small))
        dispatch(avatarDataFetchingAC(false))

    }
}

export const updateProfileTC = (userid, about, applicant, description,
                                name, git, vk, fb, inst, twit,
                                web, youtube, link) => async (dispatch) => {
    const response = await profileApi.updateProfile(userid, about, applicant, description,
        name, git, vk, fb, inst, twit,
        web, youtube, link)
    if (response.data.resultCode === 0) {
        dispatch(resultAC('success'))
        setTimeout(() => {
            dispatch(resultAC(null))
        }, 2000)
    } else {
        dispatch(resultAC('error'))
        setTimeout(() => {
            dispatch(resultAC(null))
        }, 2000)
    }
}



