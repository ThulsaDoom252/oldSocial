import React from 'react';
import {nightModeStyles} from "../../common/nightModeStyles";
import Paginator from "./Paginator";
import {NavLink} from "react-router-dom";
import {truncateUserData} from "../../common/commonFuncs";

const Users = ({
                   nightMode,
                   users,
                   followUserFetch,
                   handleFollowUser,
                   defaultAvatar,
                   paginatorProps,
                   totalCount,
               }) => {
    return (
        <div style={nightMode ? nightModeStyles.centerBlock : null} className={"users-page-container"}>
            <div className={"users-page-title"}>USERS: {totalCount}</div>
            <div className="users-page-users-grid">
                {users.map(user =>
                    <div className="users-page-user-block" key={user.id}>
                        <NavLink to={'/profile/' + user.id}>
                            <div className={"users-page-avatar-small-item"}>
                                <img className={"users-page-avatar-small"}
                                     alt={"user-avatar"}
                                     src={user.photos.small ? user.photos.large : defaultAvatar}/>
                            </div>
                        </NavLink>
                        <div className={"users-data-block"}>
                            <p className={"users-page-user-name"} title={user.name}>{truncateUserData(user.name)}</p>
                            <p className={"users-page-user-status"}
                               title={user.status}>{user.status ? truncateUserData(user.status) : 'No status'}</p>
                            <button className={"users-page-follow-button"}
                                    disabled={followUserFetch === user.id}
                                    onClick={() => handleFollowUser(user.id, user.followed)}>{user.followed ? "Unfollow" : "Follow"}</button>
                        </div>
                    </div>
                )}
            </div>
            <Paginator {...{totalCount, paginatorProps}}/>
        </div>
    );
};

export default Users;