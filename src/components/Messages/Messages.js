import React, {useEffect, useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import authHoc from "../HOC/authHoc";
import {BiMessageAltEdit, FiInfo, FiPhoneCall, FiVideo} from "react-icons/all";
import {getRandomUsersTC} from "../../redux/dialogs-reducer";
import {nightModeStyles} from "../../common/nightModeStyles";

const Messages = (props) => {
    const {nightMode} = props
    const [senderId, setSenderId] = useState(0)

    const currentUserName = props.login

    const users = props.randomUsers
    const userAvatars = users.map(user => user.photos.small ? user.photos.small : props.defaultAvatar)
    const userNames = users.map(user => user.name)
    const posts = [
        `Hi ${currentUserName} My name is ${userNames[senderId === 0 && 0]}. Welcome to our community!`,
        `Greeting ${currentUserName}. I am ${userNames[senderId === 1 && 1]}`,
        `Welcome! i am ${userNames[senderId === 2 && 2]}`,
        `Hi there! My name is  ${userNames[3]}`,
        `Lets go for a ride. i am ${userNames[4]}`
    ]

    useEffect(() => {
        props.getRandomUsersTC()
    }, [])


    return <div style={nightMode ? nightModeStyles.centerBlock : null} className={"message-page-container"}>
        <div className={"message-page-left-part"}>
            <div className={"new-message-block"}>
                <p>ThulsaDoom252</p>
                <button className={"new-message-button"}><BiMessageAltEdit/></button>
            </div>
            <div className={"message-page-sender-block"}>
                {props.randomUsers.map((user, index) => <div
                    style={{"background-color": index === senderId ? "gray" : null}} key={index}
                    onClick={() => setSenderId(index)}
                    className={"message-page-user"}>
                    <img className={"message-page-user-avatar"}
                         src={user.photos.small ? user.photos.small : props.defaultAvatar}
                         alt="av1"/>
                    <p className={"message-page-user-name"}>{user.name}</p>
                </div>)}
            </div>
        </div>
        <div className={"message-page-right-part"}>
            <div className={"sender-block"}>
                <div>Reciever</div>
                <div>
                    <button className={"sender-block-button"}><FiPhoneCall/></button>
                    <button className={"sender-block-button"}><FiVideo/></button>
                    <button className={"sender-block-button"}><FiInfo/></button>
                </div>
            </div>
            <div className={"messages-container"}>
                <div className={"message-block"}>
                    <img className={"message-block-avatar"} src={userAvatars[senderId]} alt="testPic"/>
                    <p className={"message-block-text"}>{`Hi ${props.login}! My name is ${userNames[senderId]}`}</p>
                </div>
            </div>
            <div className={"message-input-block"}>
                <input className={"message-input"} type="text" placeholder={"Message.."}/>
            </div>
        </div>
    </div>


}

const mapStateToProps = (state) => {
    return {
        randomUsers: state.dialogsPage.randomUsers,
        auth: state.auth.isLogged,
        login: state.auth.login,
        defaultAvatar: state.dialogsPage.defaultAvatar
    }
}

export default compose(connect(mapStateToProps, {getRandomUsersTC}), authHoc)(Messages)












