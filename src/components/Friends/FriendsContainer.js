import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import authHoc from "../HOC/authHoc";
import Friends from "./Friends";
import {getFriendsThunk, unfollowFriendThunk} from "../../redux/userSlice";

const FriendsContainer = ({nightMode, getFriendsThunk, unfollowFriendThunk, friends, defaultAvatar, friendsFetch}) => {
    useEffect(() => {
        getFriendsThunk(100)
    }, [])

    const handleUnfollowFriend = (friendId) => {
        unfollowFriendThunk({friendId})
    }

    return <Friends {...{nightMode, handleUnfollowFriend, friends, defaultAvatar, friendsFetch}}/>
}

const mapStateToProps = (state) => {
    return {
        friends: state.usersPage.friends,
        defaultAvatar: state.dialogsPage.defaultAvatar,
        auth: state.auth.isLogged,
        friendsFetch: state.usersPage.fetchUsers,
    }
}

export default compose(connect(mapStateToProps, {getFriendsThunk, unfollowFriendThunk}), authHoc)(FriendsContainer);