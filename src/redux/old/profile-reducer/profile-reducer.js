import {apiCaller, profileApi} from "../../../api/api";
// import photo1 from "./photo-1.jpeg"
// import photo2 from "./photo-2.webp"
// import photo3 from "./photo-3.webp"
// import photo4 from "./photo-4.jfif"
// import photo5 from "./photo-5.png"
// import photo6 from "./photo-6.webp"
// import photo7 from "./photo-7.jpg"
// import photo8 from "./photo-8.png"
// import photo9 from "./photo-9.png"
// import photo10 from "./photo-10.png"

import {
    ADD_POST,
    CURRENT_PROFILE, DATA_RECEIVED,
    ERROR_MESSAGE,
    SET_AVATAR,
    SET_NOTFOUND,
    SET_PHOTO, SET_RESULT, SET_STATUS,
    SET_USER_PROFILE, STATUS_ERROR,
    SHOW_OVERLAY, SET_CONTACT_VALUE
} from "../types";
// import React from "react";
import {avatarDataFetchingAC, personalDataFetchingAC, statusDataFetchingAC} from "../../commonSlice";

//ACTIONS
// export const dataReceivedAC = (success) => ({type: DATA_RECEIVED, success})
// export const statusErrorAC = (error) => ({type: STATUS_ERROR, error})
// export const resultAC = (result) => ({type: SET_RESULT, result})
// export const notFoundAC = (notFound) => ({type: SET_NOTFOUND, notFound})
// export const photoAC = (photo) => ({type: SET_PHOTO, photo})
// export const avatarAC = (avatar) => ({type: SET_AVATAR, avatar})
// export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
// export const statusAC = (status) => ({type: SET_STATUS, status})
// export const changeCurrentContactDataAC = (data) => ({type: SET_CONTACT_VALUE, data})
// export const showOverlayAC = (toggleRelay, toggleViewport, Index, contactId, contactValue) => ({
//     type: SHOW_OVERLAY,
//     toggleRelay,
//     toggleViewport,
//     Index,
//     contactId,
//     contactValue,
// })
// export const currentUserDataAC = (name, about, applicant, description, github, vk, facebook, instagram, twitter, site, youtube, link) =>
//     ({
//         type: CURRENT_PROFILE,
//         name,
//         about,
//         applicant,
//         description,
//         github,
//         vk,
//         facebook,
//         instagram,
//         twitter,
//         site,
//         youtube,
//         link
//     })

//REDUCER
// const profileReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case CURRENT_PROFILE: {
//             return {
//                 ...state,
//                 name: action.name,
//                 about: action.about,
//                 applicant: action.applicant,
//                 description: action.description,
//                 github: action.github,
//                 vk: action.vk,
//                 facebook: action.facebook,
//                 instagram: action.instagram,
//                 twitter: action.twitter,
//                 site: action.site,
//                 youtube: action.youtube,
//                 link: action.link,
//             }
//         }
//
//         case SET_USER_PROFILE: {
//             return {
//                 ...state,
//                 profile: action.profile,
//                 photos: {...action.profile.photos},
//                 contacts: {...action.profile.contacts},
//             }
//         }
//
//         case SHOW_OVERLAY:
//             return {
//
//                 ...state,
//                 showOverlay: action.toggleRelay,
//                 showOverlayPhotoViewport: action.toggleViewport,
//                 selectedPhoto: action.Index,
//                 selectedContactId: action.contactId,
//                 selectedContact: action.contactValue,
//
//             }
//
//         case SET_CONTACT_VALUE:
//             return {
//                 ...state,
//                 selectedContact: action.data
//             }
//
//
//         case ERROR_MESSAGE: {
//             return {
//                 ...state,
//                 errorMessage: action.message
//             }
//         }
//
//         case SET_AVATAR:
//             return {
//                 ...state,
//                 avatar: action.avatar,
//             }
//
//         case SET_NOTFOUND :
//             return {
//                 ...state,
//                 notFound: action.notFound
//             }
//
//         case SET_PHOTO:
//             return {
//                 ...state,
//                 profile: {...state.profile, photos: action.photo},
//                 photos: {...action.photo},
//
//             }
//
//         case DATA_RECEIVED: {
//             return {
//                 ...state,
//                 dataReceived: action.success
//             }
//
//         }
//         case STATUS_ERROR: {
//             return {
//                 ...state,
//                 statusError: action.error
//             }
//
//         }
//         case  SET_STATUS:
//             return {
//                 ...state, status: action.status
//             }
//
//         case SET_RESULT:
//             return {
//                 ...state,
//                 result: action.result
//             }
//
//         case ADD_POST:
//             return {
//                 ...state,
//                 posts: [...state.posts, {message: action.post, likesCount: 0}],
//             }
//         default:
//             return state
//     }
// }


// const initialState = {
//     avatar: null,
//     avatarLarge: null,
//     directEditMode: true,
//     profile: '',
//     contacts: '',
//     showOverlay: false,
//     showOverlayPhotoViewport: false,
//     selectedPhoto: null,
//     selectedContact: null,
//     selectedContactId: null,
//     currentUserAvatar: null,
//     name: null,
//     about: null,
//     applicant: null,
//     description: null,
//     github: null,
//     vk: null,
//     facebook: null,
//     instagram: null,
//     twitter: null,
//     site: null,
//     youtube: null,
//     link: null,
//     dataReceived: false,
//     status: '',
//     result: null,
//     errorMessage: null,
//     notFound: null,
//     statusError: null,
//     defaultPhotos: [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10]
// }

//THUNKS
// export const setUserTC = (userId) => {
//     return async (dispatch) => {
//         try {
//             await dispatch(personalDataFetchingAC(true))
//             const data = await apiCaller.setUsers(userId)
//             dispatch(setUserProfile(data))
//             dispatch(notFoundAC(false))
//             debugger
//             dispatch(personalDataFetchingAC(false))
//         } catch (error) {
//             dispatch(notFoundAC(true))
//         }
//
//     }
// }
//
// export const getStatusTC = (userId) => async (dispatch) => {
//     dispatch(statusDataFetchingAC(true))
//     const response = await profileApi.getStatus(userId)
//     dispatch(statusAC(response.data))
//     dispatch(statusDataFetchingAC(false))
// }
//
// export const updateStatusTC = (status) => async (dispatch) => {
//     dispatch(statusDataFetchingAC(true))
//     const data = await profileApi.updateStatus(status)
//     if (data.resultCode === 0) {
//         dispatch(statusAC(status))
//         dispatch(statusErrorAC(false))
//         dispatch(statusDataFetchingAC(false))
//     } else {
//         dispatch(statusErrorAC(true))
//         setTimeout(() => {
//             dispatch(statusErrorAC(false))
//         }, 3000)
//         dispatch(statusDataFetchingAC(false))
//     }
// }
//
// export const setCurrentUserDataTC = (userId) => async (dispatch) => {
//     const data = await apiCaller.setUsers(userId)
//     dispatch(currentUserDataAC(data.fullName, data.aboutMe, data.lookingForAJob, data.lookingForAJobDescription,
//             data.contacts.github, data.contacts.vk, data.contacts.facebook, data.contacts.instagram, data.contacts.twitter,
//             data.contacts.website, data.contacts.youtube, data.contacts.mainLink),
//         dispatch(dataReceivedAC(true))
//     )
// }
//
// export const setAvatarTC = (userId) => async (dispatch) => {
//     dispatch(avatarDataFetchingAC(true))
//     const data = await apiCaller.setUsers(userId)
//     dispatch(avatarAC(data.photos.small))
//     dispatch(avatarDataFetchingAC(false))
// }
//
// export const updatePhotoTC = (photo) => async (dispatch) => {
//     dispatch(avatarDataFetchingAC(true))
//     const response = await profileApi.updatePhoto(photo)
//
//     if (response.data.resultCode === 0) {
//         dispatch(photoAC(response.data.data.photos))
//         dispatch(avatarAC(response.data.data.photos.small))
//         dispatch(avatarDataFetchingAC(false))
//
//     }
// }
//
// export const updateProfileTC = (userid, about, applicant, description,
//                                 name, git, vk, fb, inst, twit,
//                                 web, youtube, link) => async (dispatch) => {
//     const response = await profileApi.updateProfile(userid, about, applicant, description,
//         name, git, vk, fb, inst, twit,
//         web, youtube, link)
//     if (response.data.resultCode === 0) {
//         dispatch(resultAC('success'))
//         setTimeout(() => {
//             dispatch(resultAC(null))
//         }, 2000)
//     } else {
//         dispatch(resultAC('error'))
//         setTimeout(() => {
//             dispatch(resultAC(null))
//         }, 2000)
//     }
// }
