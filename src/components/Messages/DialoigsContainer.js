import React, {useEffect, useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import authHoc from "../HOC/authHoc";
import {getRandomUsersTC} from "../../redux/dialogsSlice";
import {nightModeStyles} from "../../common/nightModeStyles";
import Dialogs from "./Dialogs";

const DialogsContainer = ({randomUsers, nightMode, login: currentUserName, getRandomUsersTC}) => {
    const [senderId, setSenderId] = useState(0)
    const defaultAvatar = require("../common/default-avatar.jfif")

    useEffect(() => {
        getRandomUsersTC()
    }, [])

    const handleSenderId = (index) => {
        setSenderId(index)
    }

    const userAvatars = randomUsers.map(user => user.photos.small ? user.photos.small : defaultAvatar)
    const userNames = randomUsers.map(user => user.name)

    return <Dialogs {...{senderId, nightModeStyles, nightMode,currentUserName, userNames, userAvatars, randomUsers, handleSenderId, defaultAvatar}}/>


}

const mapStateToProps = (state) => {
    return {
        randomUsers: state.dialogsPage.randomUsers,
        auth: state.auth.isLogged,
        login: state.auth.login,
    }
}

export default compose(connect(mapStateToProps, {getRandomUsersTC}), authHoc)(DialogsContainer);




