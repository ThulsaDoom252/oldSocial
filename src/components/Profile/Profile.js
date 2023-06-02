import React, {useEffect} from "react";
import ProfileCenterPart from "./ProfileCenterPart/ProfileCenterPart";
import {compose} from "redux";
import {connect, useDispatch} from "react-redux";
import authHoc from "../HOC/authHoc";
import withRouter from "../HOC/withRouter";
import {
    setCurrentUserDataTC,
    getStatusTC,
    setUserTC, showOverlayAC, updateProfileTC, updateStatusTC, updatePhotoTC,
} from "../../redux/profile/profileSlice";
import ProfileLeftPart from "./LeftPart";
import ProfileRightPart from "./RightPart";
import {getFriendsTC, unfollowFriendTC} from "../../redux/userSlice";

const Profile = (props) => {
    const {
        notFound,
        email,
        nightMode,
        fetchPersonalData,
        fetchAuthData,
        fetchFriends,
        fetchStatusData,
        fetchAvatar,
        showMobileVersion,
        profile,
        updateProfileTC: updateProfile,
        directEditMode,
        defaultAvatar,
        friends,
        status,
        defaultPhotos,
        hideProfileWall,
        hideEmail,
        showOverlayAC: toggleOverlay,
        getFriendsTC: getFriends,
        unfollowFriendTC,
        updateStatusTC: updateStatus,
        updatePhotoTC: updatePhoto,
        setUserTC: setUser,
    } = props
    const currentUserId = props.Id
    const userIdParam = props.router.params.userId
    const isCurrentUser = userIdParam === currentUserId.toString()
    useEffect(() => {
        let userIdParam = props.router.params.userId
        setUser(userIdParam)
        props.getStatusTC(userIdParam)
        props.currentUserDataTC(userIdParam)
    }, [userIdParam])

    return (
        <div className={"profile-main-container"}>
            {!showMobileVersion &&
                <ProfileLeftPart {...[profile, isCurrentUser, email, updateProfile, directEditMode, nightMode, fetchPersonalData, fetchAuthData, hideEmail]}/>}
            <ProfileCenterPart  {...[profile, isCurrentUser, notFound, directEditMode,
                updateProfile, defaultAvatar, status, updateStatus, defaultPhotos,
                toggleOverlay, friends, nightMode, hideProfileWall, updatePhoto, showMobileVersion, fetchPersonalData, fetchStatusData, fetchAvatar]}/>
            {!showMobileVersion &&
                <ProfileRightPart {...[isCurrentUser, defaultAvatar, friends, defaultPhotos, toggleOverlay,
                    getFriends, unfollowFriendTC, nightMode, fetchFriends]}/>}
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        fetchPersonalData: state.common.fetchPersonalData,
        fetchAuthData: state.common.fetchAuthData,
        fetchFriends: state.usersPage.fetchUsers,
        fetchStatusData: state.common.fetchStatusData,
        fetchAvatar: state.common.fetchAvatar,
        notFound: state.profilePage.notFound,
        defaultPhotos: state.profilePage.defaultPhotos,
        auth: state.auth.isLogged,
        Id: state.auth.id,
        email: state.auth.email,
        defaultAvatar: state.dialogsPage.defaultAvatar,
        friends: state.usersPage.friends,
        status: state.profilePage.status,
        directEditMode: state.settings.directEditMode,
        hideProfileWall: state.settings.hideProfileWall,
        showMobileVersion: state.settings.showMobileVersion,
        hideEmail: state.settings.hideEmail,
    }
}

export default compose(connect(mapStateToProps, {
    setUserTC,
    getStatusTC,
    currentUserDataTC: setCurrentUserDataTC,
    showOverlayAC,
    getFriendsTC,
    updateProfileTC,
    updateStatusTC,
    unfollowFriendTC,
    updatePhotoTC,
}), authHoc, withRouter)(Profile)
