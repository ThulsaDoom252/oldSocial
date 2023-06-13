import React from 'react';
import {NavLink} from "react-router-dom";
import {fetchUsers} from "../../redux/commonSlice";

const Friends = ({nightMode, friends, handleUnfollowFriend, defaultAvatar, friendsFetch}) => {
    return (
        <>
            {!friendsFetch ?
                <div style={nightMode ? nightModeStyles.centerBlock : null} className={"friends-page-container"}>
                    <div className={"friends-page-title-block"}>
                        <p className={"friends-page-title"}>You following {friends.length} Users</p>
                        <hr className={"friends-page-hr"}/>
                    </div>
                    <div className={"friends-flex-block"}>
                        <div className={"friends-grid-block"}>
                            {friends.map((friend, index) => <div key={index} className={"friend-block"}>
                                <NavLink to={'/profile/' + friend.id}>
                                    <img className={"friend-avatar"}
                                         src={friend.photos.large ? friend.photos.large : defaultAvatar}
                                         alt="user-avatar"/>
                                </NavLink>
                                <div className={"friend-data-block"}>
                                    <p className={"friend-name"}>{friend.name}</p>
                                    <p className={"friend-status"}>{friend.status}</p>
                                    <button onClick={() => handleUnfollowFriend(friend.id)}
                                            className={"friend-button"}>Unfollow
                                    </button>
                                </div>
                            </div>)}
                        </div>
                    </div>

                </div> : <div className={"friends-page-container"}>{fetchUsers}</div>}

        </>
    );
};

export default Friends;