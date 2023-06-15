import React, {useEffect} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import authHoc from "../HOC/authHoc";
import withRouter from "../HOC/withRouter";
import ProfileContainer from "./ProfileContainer";
import {initializeProfileThunk} from "../../redux/appSlice";
import EmptyProfileTemplate from "./EmptyProfileTemplate";
import NotFound from "../common/NotFound";

const ProfileRelay = (props, {showMobileVersion}) => {
    const {initializeProfileThunk, friends, friendsCount, profile, profileDataUpdated, profilePageNotFound} = props
    const userIdRouterParam = props.router.params.userId
    const {userId} = profile
    useEffect(() => {
        if (userId !== parseInt(userIdRouterParam) || profileDataUpdated) {
            initializeProfileThunk({
                userId: userIdRouterParam,
                friendsArray: friends,
                friendsCount,
                profilePageNotFound
            })
        }

    }, [userIdRouterParam])

    if (profilePageNotFound === true) return <NotFound/>

    if (!props.profileInitialized) return <EmptyProfileTemplate {...{showMobileVersion}}/>

    return (
        <ProfileContainer {...{userIdRouterParam}}/>
    );
};

const mapStateToProps = (state) => {
    return {
        profilePageNotFound: state.profilePage.profilePageNotFound,
        profileDataUpdated: state.profilePage.profileDataUpdated,
        friendsCount: state.usersPage.friendsCount,
        profile: state.profilePage.profile,
        auth: state.auth.isLogged,
        friends: state.usersPage.friends,
        profileInitialized: state.app.profileInitialized,
        showMobileVersion: state.app.showMobileVersion,

    }
}

export default compose(connect(mapStateToProps, {initializeProfileThunk}), authHoc, withRouter)(ProfileRelay)


