import React from 'react';
import {useEffect} from "react";
import {setCurrentUserAvatarThunk} from "../../redux/profile/profileSlice";
import {logOutThunk} from "../../redux/authSlice";
import {useSelector} from "react-redux";
import Header from "./Header";

const HeaderContainer = ({dispatch}) => {
    const isLogged = useSelector(state => state.auth.isLogged)
    const userName = useSelector(state => state.auth.login)
    const nightMode = useSelector(state => state.settings.nightMode)
    const userId = useSelector(state => state.auth.id)
    const currentUserAvatar = useSelector(state => state.profilePage.currentUserAvatar)
    const fetching = useSelector(state => state.common.fetchAuthData)
    useEffect(() => {
        setCurrentUserAvatarThunk(`${userId}`)
    }, [])

    const handleLogOut = async () => {
        dispatch(logOutThunk())
    }

    return (
        <Header {...{isLogged, userName, nightMode, userId, currentUserAvatar, fetching, handleLogOut}}/>
    );
};

export default HeaderContainer;