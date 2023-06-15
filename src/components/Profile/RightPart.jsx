import React from 'react';
import {NavLink} from "react-router-dom";
import {nightModeStyles} from "../../common/nightModeStyles";
import {AiOutlineInfoCircle} from "react-icons/ai";
import {truncateUserData} from "../../common/commonFuncs";

const RightPart = ({
                       defaultAvatar,
                       friends,
                       userPhotos,
                       nightMode,
                       handleSelectedPhoto,
                       handleFollowUser,
                       followUserFetch,
                   }) => {
    return (
        <div className={"profile-page-right-part-container"}>
            <div style={nightMode ? nightModeStyles.profileRightPart : null}
                 className={"profile-page-right-part-photos-block"}>
                <p className={"profile-page-right-part-photos-block-label"}><NavLink className={"photos-link"}
                                                                                     to={"/gallery"}>Latest
                    photos <AiOutlineInfoCircle title={"Photos are hardcoded. You can't handle photos..yet"}/></NavLink>
                </p>
                {userPhotos.map((photo, index) => <span key={index}>
                    <img onClick={() => handleSelectedPhoto(index)}
                         key={index}
                         className={"profile-page-right-part-photo"}
                         src={require(`../../redux/profile/${photo}`)} alt="default-photo"/>
                </span>)}
            </div>
            <div style={nightMode ? nightModeStyles.profileRightPart : null}
                 className={"profile-page-right-part-friends-block"}>
                <p>Friends({friends.length})</p>
                <p>{friends.length === 0 && "You have no friends yet.."}</p>
                {friends.map((friend, index) => index < 4 &&
                    <div className={"profile-page-right-friend-block"} key={index}>
                        <NavLink to={`/profile/` + friend.id}>
                            <img className={"profile-page-right-friend-avatar"}
                                 src={friend.photos.small ? friend.photos.small : defaultAvatar} alt="friend-photo"/>
                            <p title={friend.name}>{truncateUserData(friend.name)}</p>
                        </NavLink>
                        <button key={index} className={"profile-page-right-unfollow-button"}
                                disabled={followUserFetch === friend.id}
                                onClick={() => handleFollowUser({friendIdParam: friend.id})}>Unfollow
                        </button>
                    </div>)}
                <p hidden={friends.length <= 5}><NavLink to={"/friends"}>Show all friends...</NavLink></p>
            </div>
        </div>
    );
}

export default RightPart