import React from 'react';
import WallNavbar from "./WallNavbar";
import WallSections from "./WallSections";
import {useState} from "react";

function ProfileWall(props) {
    const {0: name, 1: {large: largePhoto}, 2: defaultAvatar} = props
    const [activeBlock, setActiveBlock] = useState('Posts')
    const handleClick = (number) => {
        setActiveBlock(number)
    }
    const firstPost = `Hi! i am ${name}, This is my first post`
    const secondPost = `You can't add more posts, because this func isn't released by the back-end developer`
    const isPostSectionActive = activeBlock === 'Posts'
    const isMediaSectionActive = activeBlock === 'Media'
    const isLikesSectionActive = activeBlock === 'Likes'
    const isRepliesSectionActive = activeBlock === 'Replies'
    return (
        <div className={"profile-page-center-wall"}>
            <WallNavbar {...[activeBlock, handleClick]}/>
            <WallSections {...[name, firstPost, secondPost, largePhoto, defaultAvatar, isPostSectionActive,
                isMediaSectionActive, isLikesSectionActive, isRepliesSectionActive]}/>
        </div>
    );
}

export default ProfileWall;