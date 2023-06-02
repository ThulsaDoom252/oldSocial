import React, {useEffect} from 'react';
import img from "./common/default-avatar.jfif"
import {connect} from "react-redux";
import {getFriendsTC, unfollowFriendTC} from "../redux/userSlice";
import {compose} from "redux";
import authHoc from "./HOC/authHoc";
import {NavLink} from "react-router-dom";
import {nightModeStyles} from "../common/nightModeStyles";
import {fetchUsers} from "../redux/commonSlice";

function Friends(props) {
    const {nightMode} = props
    useEffect(() => {
        props.getFriendsTC(100)
    }, [])

    const handleUnfollowFriend = (friendId) => {
        props.unfollowFriendTC({friendId})
    }

    return (
        <>
            {!props.friendsFetch ?  <div style={nightMode ? nightModeStyles.centerBlock : null} className={"friends-page-container"}>
                <div className={"friends-page-title-block"}>
                    <p className={"friends-page-title"}>You following {props.friends.length} Users</p>
                    <hr className={"friends-page-hr"}/>
                </div>
                <div className={"friends-flex-block"}>
                    <div className={"friends-grid-block"}>
                        {props.friends.map((friend, index) => <div key={index} className={"friend-block"}>
                            <NavLink to={'/profile/' + friend.id}>
                                <img className={"friend-avatar"}
                                     src={friend.photos.large ? friend.photos.large : props.defaultAvatar} alt="user-avatar"/>
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
}

let mapStateToProps = (state) => {
    return {
        friends: state.usersPage.friends,
        defaultAvatar: state.dialogsPage.defaultAvatar,
        auth: state.auth.isLogged,
        friendsFetch: state.usersPage.fetchUsers,
    }
}

export default compose(connect(mapStateToProps, {getFriendsTC, unfollowFriendTC}), authHoc)(Friends);