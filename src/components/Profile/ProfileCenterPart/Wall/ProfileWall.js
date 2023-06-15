import React from 'react';
import WallNavbar from "./WallNavbar";
import WallSections from "./WallSections";
import {useState} from "react";

const ProfileWall = ({fullName, largePhoto, defaultAvatar}) => {
    const [activeBlock, setActiveBlock] = useState('Posts')
    const handleClick = (number) => {
        setActiveBlock(number)
    }
    const firstPost = `Hi! i am ${fullName}, This is my first post`
    const secondPost = `You can't add more posts, because this func isn't released by the back-end developer`
    const isPostSectionActive = activeBlock === 'Posts'
    const isMediaSectionActive = activeBlock === 'Media'
    const isLikesSectionActive = activeBlock === 'Likes'
    const isRepliesSectionActive = activeBlock === 'Replies'
    return (
        <div className={"profile-page-center-wall"}>
            <WallNavbar {...[activeBlock, handleClick]}/>
            <WallSections {...[fullName, firstPost, secondPost, largePhoto, defaultAvatar, isPostSectionActive,
                isMediaSectionActive, isLikesSectionActive, isRepliesSectionActive]}/>
        </div>
    );
}

export default ProfileWall;