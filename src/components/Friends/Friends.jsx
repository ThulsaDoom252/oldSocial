import React from 'react';
import {NavLink} from "react-router-dom";
import {truncateUserData} from "../../common/commonFuncs";
import {fetchUsers} from "../../common/commonData";

const Friends = ({nightMode, friends, handleUnfollowFriend, defaultAvatar, friendsFetch}) => {
    return (
        <>x
            {!friendsFetch ?
                <div style={nightMode ? nightModeStyles.centerBlock : null} className={"friends-page-container"}>
                    <div className={"friends-page-title-block"}>
                        <p className={"friends-page-title"}>You are following {friends.length} Users</p>
                        <hr className={"friends-page-hr"}/>
                    </div>
                    <div className={"friends-grid-block"}>
                        {friends.map((friend, index) => <div key={index} className={"friend-block"}>
                            <NavLink to={'/profile/' + friend.id}>
                                <img className={"friend-avatar"}
                                     src={friend.photos.large ? friend.photos.large : defaultAvatar}
                                     alt="user-avatar"/>
                            </NavLink>
                            <div className={"friend-data-block"}>
                                <p className={"friend-name"} title={friend.name}>{truncateUserData(friend.name)}</p>
                                <p className={"friend-status"}
                                   title={friend.status}>{friend.status ? truncateUserData(friend.status) : "No status"}</p>
                                <button onClick={() => handleUnfollowFriend(friend.id)}
                                        className={"friend-button"}>Unfollow
                                </button>
                            </div>
                        </div>)}
                    </div>
                </div> : <div className={"friends-page-container"}>{fetchUsers}</div>}

        </>
    );
};

export default Friends;