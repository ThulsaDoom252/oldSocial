import React from 'react';
import {useEffect} from "react";
import {avatarAC, setAvatarTC} from "../../redux/profile/profileSlice";
import {logOutTC} from "../../redux/authSlice";
import {delay} from "../../redux/commonRefs";
import {useSelector} from "react-redux";
import {toggleNightModeAC} from "../../redux/settingsSlice";
import Header from "./Header";

const HeaderContainer = ({dispatch}) => {
    const isLogged = useSelector(state => state.auth.isLogged)
    const userName = useSelector(state => state.auth.login)
    const nightMode = useSelector(state => state.settings.nightMode)
    const userId = useSelector(state => state.auth.id)
    const avatar = useSelector(state => state.profilePage.avatar)
    const fetching = useSelector(state => state.common.fetchAuthData)
    useEffect(() => {
        setAvatarTC(`${userId}`)
    }, [])

    const turnOffNightMode = () => nightMode && toggleNightModeAC(false)

    const handleLogOut = async () => {
        dispatch(logOutTC())
        turnOffNightMode()
        await delay(2000)
        avatarAC(null)
    }
    return (
        <Header {...{isLogged, userName, nightMode, userId, avatar, fetching, handleLogOut}}/>
    );
};

export default HeaderContainer;