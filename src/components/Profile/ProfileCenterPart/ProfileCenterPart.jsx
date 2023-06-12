import React from "react";
import NotFound from "../../common/NotFound";
import ProfileData from "./profileData";
import ProfileAvatarBlock from "./profileAvatarBlock";
import ProfileWall from "./Wall/ProfileWall";
import {NavLink} from "react-router-dom";
import {nightModeStyles} from "../../../common/nightModeStyles";
import emojiHidden from "./emojiHidden.png"

const ProfileCenterPart = ({
                               fullName,
                               isCurrentUser,
                               notFound,
                               directEditMode,
                               defaultAvatar,
                               userPhotos,
                               showOverlayAC,
                               friends,
                               nightMode,
                               hideProfileWall,
                               showMobileVersion,
                               fetchPersonalData,
                               profileAvatarProps,
                               statusProps,
                               profileDataProps,
                               largePhoto,
                           }) => {

    if (notFound) {
        return <NotFound/>
    }

    return (
        <div style={nightMode ? nightModeStyles.centerBlock : null} className={"profile-page-center-container"}>
            <div className={"profile-page-center-bg"}>
                <NavLink hidden={directEditMode} to={"/edit"} className={"profile-page-edit-button"}>Edit
                    Profile</NavLink>
            </div>
            <div className={"profile-page-center-userInfo-container"}>
                <ProfileAvatarBlock {...{
                    isCurrentUser, directEditMode, defaultAvatar, profileAvatarProps, statusProps,
                }}/>
                <ProfileData {...{isCurrentUser, fetchPersonalData, profileDataProps}}/>
            </div>
            {isCurrentUser && <div style={{"display": showMobileVersion && "block"}} className={"mobile-friends-block"}>
                <div className={"center-friends-block"}>
                    {friends.map((friend, index) => index < 4 && <div className={"center-friend-block"}><img
                        src={friend.photos.small ? friend.photos.small : defaultAvatar}
                        alt={`photo${index}`}/><p>{friend.name}</p></div>)}
                </div>
                <NavLink to={"/friends"} className={"center-friends-button"}>...</NavLink>
            </div>}
            {isCurrentUser && <div style={{"display": showMobileVersion && "block"}} className={"mobile-gallery-block"}>
                <div className={"photos-block"}>
                    {userPhotos.map((photo, index) => <div className={"center-gallery-photo-block"}>{index < 4 &&
                        <img className={"center-gallery-photo"}
                             onClick={() => showOverlayAC({toggleRelay: true, toggleViewPort: true, index})}
                             src={photo}
                             alt={`photo${index}`}/>}</div>)}
                </div>
                <NavLink to={"/gallery"} className={"center-gallery-button"}>To gallery</NavLink>
            </div>}
            {!hideProfileWall ? <ProfileWall {...{fullName, largePhoto, defaultAvatar}}/> :
                <div className={"wall-plug"}>
                    <span className={"wall-plug-label"}>The wall is hidden</span>
                    <img className={"wall-plug-img"} src={emojiHidden} alt="wallIsHidden"/>
                </div>}

        </div>

    )
}


export default ProfileCenterPart