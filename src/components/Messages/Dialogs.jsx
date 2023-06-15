import React from "react";
import {FiInfo, FiPhoneCall, FiVideo} from "react-icons/fi";
import {BiMessageAltEdit,} from "react-icons/bi"

const Dialogs = ({
                     nightModeStyles,
                     nightMode,
                     randomUsers,
                     senderId,
                     userAvatars,
                     currentUserName,
                     userNames,
                     handleSenderId,
                     defaultAvatar
                 }) => {
    return <div style={nightMode ? nightModeStyles.centerBlock : null} className={"message-page-container"}>
        <div className={"message-page-left-part"}>
            <div className={"new-message-block"}>
                <p>ThulsaDoom252</p>
                <button className={"new-message-button"}><BiMessageAltEdit/></button>
            </div>
            <div className={"message-page-sender-block"}>
                {randomUsers.map((user, index) => <div
                    style={{"backgroundColor": index === senderId ? "gray" : null}} key={index}
                    onClick={() => handleSenderId(index)}
                    className={"message-page-user"}>
                    <img className={"message-page-user-avatar"}
                         src={user.photos.small ? user.photos.small : defaultAvatar}
                         alt="av1"/>
                    <p className={"message-page-user-name"}>{user.name}</p>
                </div>)}
            </div>
        </div>
        <div className={"message-page-right-part"}>
            <p className={"page-info"}>*Messages are not functioning for a moment. Just a demo page</p>
            <div className={"sender-block"}>
                <div>Receiver</div>
                <div>
                    <button className={"sender-block-button"}><FiPhoneCall/></button>
                    <button className={"sender-block-button"}><FiVideo/></button>
                    <button className={"sender-block-button"}><FiInfo/></button>
                </div>
            </div>
            <div className={"messages-container"}>
                <div className={"message-block"}>
                    <img className={"message-block-avatar"} src={userAvatars[senderId]} alt="testPic"/>
                    <p className={"message-block-text"}>{`Hi ${currentUserName}! My name is ${userNames[senderId]}`}</p>
                </div>
            </div>
            <div className={"message-input-block"}>
                <input className={"message-input"} type="text" placeholder={"Message.."}/>
            </div>
        </div>
    </div>


}


export default Dialogs












