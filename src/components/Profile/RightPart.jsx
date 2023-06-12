import React from 'react';
import {NavLink} from "react-router-dom";
import {nightModeStyles} from "../../common/nightModeStyles";

const RightPart = ({defaultAvatar, friends, userPhotos, showOverlayAC, unFollowFriend, nightMode}) => {
    const handleUnfollow = (friendId, index) => unFollowFriend({friendId, index})
    return (
        <div className={"profile-page-right-part-container"}>
            <div style={nightMode ? nightModeStyles.profileRightPart : null}
                 className={"profile-page-right-part-photos-block"}>
                <p className={"profile-page-right-part-photos-block-label"}><NavLink to={"/gallery"}>Latest
                    photos</NavLink></p>
                {userPhotos.map((photo, index) => <span key={index}>
                    <img onClick={() => showOverlayAC({toggleRelay: true, toggleViewPort: true, index})}
                         key={index}
                         className={"profile-page-right-part-photo"}
                         src={photo} alt="default-photo"/>
                </span>)}
            </div>
            <div style={nightMode ? nightModeStyles.profileRightPart : null}
                                  className={"profile-page-right-part-friends-block"}>
                <p>Friends({friends.length})</p>
                <p>{friends.length === 0 && "You have no friends yet.."}</p>
                {friends.map((friend, index) => index < 5 && <div className={"profile-page-right-friend-block"}>
                    <NavLink to={`/profile/` + friend.id}>
                        <img className={"profile-page-right-friend-avatar"}
                             src={friend.photos.small ? friend.photos.small : defaultAvatar} alt="friend-photo"/>
                    </NavLink>
                    <button key={index} className={"profile-page-right-unfollow-button"}
                            onClick={() => handleUnfollow(friend.id, index)}>Unfollow
                    </button>
                </div>)}
                <p hidden={friends.length <= 5}><NavLink to={"/friends"}>Show all friends...</NavLink></p>
            </div>
        </div>
    );
}

export default RightPart