import React, {useEffect, useState} from 'react';
import {
    AiOutlineDislike, AiOutlineLike, AiOutlineShareAlt,
} from "react-icons/ai";

import {FaRegComment} from "react-icons/fa"

const ReactionsBar = () => {
    const [likes, likesNumber] = useState(0)
    const [dislikes, dislikesNumber] = useState(0)

    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    useEffect(() => {
        likesNumber(randomNumberInRange(1, 40))
        dislikesNumber(randomNumberInRange(1, 5))
    }, [])
    return (
        <div className={"profile-reactions-container"}>
            <button className={"profile-reaction"}>
                <AiOutlineLike className={"profile-reaction-icon"}/>{likes}
            </button>
            <button className={"profile-reaction"}>
                <AiOutlineDislike className={"profile-reaction-icon"}/>{dislikes}
            </button>
            <button className={"profile-reaction"}>
                <FaRegComment className={"profile-reaction-icon"}/>
            </button>
            <button className={"profile-reaction"}>
                <AiOutlineShareAlt className={"profile-reaction-icon"}/>
            </button>
        </div>
    );
}

export default ReactionsBar;