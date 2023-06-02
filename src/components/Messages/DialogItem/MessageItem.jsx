import React from "react";
import {NavLink} from "react-router-dom";


const MessageItem = (props) => {
    let path = '/dialogs/' + props.id;
    return (
        <div className={"messages" + " " + "active"}><NavLink to={path}>{props.name}</NavLink></div>
    )
}


export default MessageItem