import React from 'react';
import {nightModeStyles} from "../../common/nightModeStyles";
import Paginator from "./Paginator";
import {NavLink} from "react-router-dom";
import anonymous from "../common/default-avatar.jfif";

const Users = ({
                   nightMode,
                   users,
                   followingProgress,
                   handleFollowUser,
                   truncateUserData,
                   handleUnFollowUser,
                   paginatorProps,
               }) => {
    return (
        <div style={nightMode ? nightModeStyles.centerBlock : null} className={"users-page-container"}>
            <div className={"users-page-title"}>USERS:</div>
            <div className="users-page-users-grid">
                {users.map(user =>
                    <div className="users-page-user-block" key={user.id}>
                        <NavLink to={'/profile/' + user.id}>
                            <img className={"users-page-avatar-small"}
                                 src={user.photos.small != null ? user.photos.small : anonymous}/>
                        </NavLink>
                        <div className={"users-data-block"}>
                            <p className={"users-page-user-name"} title={user.name}>{truncateUserData(user.name)}</p>
                            <p className={"users-page-user-status"}
                               title={user.status}>{user.status ? truncateUserData(user.status) : 'No status'}</p>
                            {user.isFollow ?
                                <button className={"users-page-follow-button"}
                                        disabled={followingProgress.some(id => id === user.id)}
                                        onClick={() => handleUnFollowUser(user.id)}>Unfollow</button> :
                                <button className={"users-page-follow-button"}
                                        disabled={followingProgress.some(id => id === user.id)}
                                        onClick={() => {
                                            handleFollowUser(userId)
                                        }}>Follow</button>}
                        </div>
                    </div>
                )}
            </div>
            <Paginator {...{paginatorProps}}/>
        </div>
    );
};

export default Users;