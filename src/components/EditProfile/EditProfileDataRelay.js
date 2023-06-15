import React, {useEffect} from 'react';
import {connect} from "react-redux";
import authHoc from "../HOC/authHoc";
import EditProfileDataEmptyTemplate from "./EditProfileDataEmptyTemplate";
import EditProfileDataContainer from "./EditProfileDataContainer";
import {setUserThunk} from "../../redux/profile/profileSlice";
import {initializeProfileThunk} from "../../redux/appSlice";

const EditProfileDataRelay = ({initializeProfileThunk, profile, friends, friendsCount}) => {
    useEffect(() => {
        const currentUserid = localStorage.getItem("userId")
        initializeProfileThunk({userId: currentUserid, friendsArray: friends, friendsCount})
    }, [])


    if (Object.keys(profile).length < 7) {
        return <EditProfileDataEmptyTemplate/>
    }

    return <EditProfileDataContainer/>

}

const mapStateToProps = (state) => {
    return {
        friends: state.usersPage.friends,
        friendsCount: state.usersPage.friendsCount,
        profile: state.profilePage.profile,
        auth: state.auth.isLogged,
    }
}

export default connect(mapStateToProps, {setUserThunk, initializeProfileThunk})(authHoc(EditProfileDataRelay));
