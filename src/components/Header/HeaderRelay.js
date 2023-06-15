import React from 'react';
import {useEffect} from "react";
import {avatarAC, setCurrentUserAvatarThunk} from "../../redux/profile/profileSlice";
import {logOutThunk} from "../../redux/authSlice";
import {useSelector} from "react-redux";
import {toggleNightModeAC} from "../../redux/settingsSlice";
import Header from "./Header";
import {delay} from "../../common/commonFuncs";

const HeaderContainer = ({dispatch}) => {
    const isLogged = useSelector(state => state.auth.isLogged)
    const userName = useSelector(state => state.auth.login)
    const nightMode = useSelector(state => state.settings.nightMode)
    const userId = useSelector(state => state.auth.id)
    const avatar = useSelector(state => state.profilePage.avatar)
    const fetching = useSelector(state => state.common.fetchAuthData)
    useEffect(() => {
        setCurrentUserAvatarThunk(`${userId}`)
    }, [])

    const turnOffNightMode = () => nightMode && toggleNightModeAC(false)

    const handleLogOut = async () => {
        dispatch(logOutThunk())
        turnOffNightMode()
        await delay(2000)
        avatarAC(null)
    }
    return (
        <Header {...{isLogged, userName, nightMode, userId, avatar, fetching, handleLogOut}}/>
    );
};

export default HeaderContainer;