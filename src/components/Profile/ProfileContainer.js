import React, {useEffect} from "react";
import ProfileCenterPart from "./ProfileCenterPart/ProfileCenterPart";
import {compose} from "redux";
import {connect, useSelector} from "react-redux";
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

const ProfileContainer = (props) => {
    const {
        updateProfileTC, showOverlayAC, getFriendsTC, unfollowFriendTC, setCurrentUserDataTC, updateStatusTC,
        getStatusTC, updatePhotoTC, setUserTC,
    } = props

    const userId = useSelector(state => state.auth.id)
    const email = useSelector(state => state.auth.email)
    const profile = useSelector(state => state.profilePage.profile)
    const defaultPhotos = useSelector(state => state.profilePage.defaultPhotos)
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
    const fetchAuthData = useSelector(state => state.common.fetchAuthData)
    const fetchFriends = useSelector(state => state.common.fetchFriends)
    const fetchStatusData = useSelector(state => state.common.fetchStatusData)
    const fetchAvatar = useSelector(state => state.common.fetchAvatar)

    const currentUserId = userId
    const userIdRouterParam = props.router.params.userId
    const isCurrentUser = userIdRouterParam === currentUserId.toString()

    useEffect(() => {
        setUserTC(userIdRouterParam)
        getStatusTC(userIdRouterParam)
        setCurrentUserDataTC(userIdRouterParam)
    }, [userIdRouterParam])

    useEffect(() => {
        if (isCurrentUser) {
            getFriendsTC(100)
        }
    }, [])

    return (
        <div className={"profile-main-container"}>
            {!showMobileVersion &&
                <ProfileLeftPart {...{
                    profile, isCurrentUser, email, updateProfileTC, directEditMode, nightMode,
                    fetchPersonalData, fetchAuthData, hideEmail
                }}/>}
            <ProfileCenterPart  {...{
                profile, isCurrentUser, notFound, directEditMode, updateProfileTC, defaultAvatar,
                status, updateStatusTC, defaultPhotos, showOverlayAC, friends, nightMode, hideProfileWall,
                updatePhotoTC, showMobileVersion, fetchPersonalData, fetchStatusData, fetchAvatar
            }}/>
            {!showMobileVersion &&
                <ProfileRightPart {...{defaultAvatar, friends, defaultPhotos, showOverlayAC,
                     unfollowFriendTC, nightMode, fetchFriends}}/>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLogged,
    }
}

export default compose(connect(mapStateToProps, {
    setUserTC,
    getStatusTC,
    setCurrentUserDataTC,
    showOverlayAC,
    getFriendsTC,
    updateProfileTC,
    updateStatusTC,
    unfollowFriendTC,
    updatePhotoTC,
}), authHoc, withRouter)(ProfileContainer)
