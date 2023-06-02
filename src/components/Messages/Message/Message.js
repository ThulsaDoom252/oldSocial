import React from "react";

const Message = (props) => {
    let content = props.content;
    return (
        <div className="content-items">
            <div className="content">{content}</div>
        </div>

    )
}

export default Message

