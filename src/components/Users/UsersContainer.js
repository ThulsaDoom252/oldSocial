import React from "react";
import {useSelector} from "react-redux";
import Users from "./Users";

const UsersContainer = ({
                            currentPage,
                            pageSize,
                            usersPerPage,
                            getUsersThunk,
                            followUserThunk,
                            unFollowUserThunk
                        }) => {


    const totalCount = useSelector(state => state.usersPage.totalCount)
    const nightMode = useSelector(state => state.app.nightMode)
    const followUserFetch = useSelector(state => state.usersPage.followUserFetch)
    const users = useSelector(state => state.usersPage.users)

    const handleFollowUser = (userId, isFollowed) => {
        if(isFollowed) {
            unFollowUserThunk({userId})
        } else {
            followUserThunk({userId})
        }
    }

    const defaultAvatar = require("../common/default-avatar.jfif")
    ///Paginator
    const handlePageChange = (currentPage) => getUsersThunk({currentPage, usersPerPage})
    const paginatorProps = [currentPage, pageSize, handlePageChange]
    return <Users {...{
        nightMode, users, followUserFetch,
        handleFollowUser, defaultAvatar, totalCount, paginatorProps
    }}/>
}

export default UsersContainer




































































































