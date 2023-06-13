import React from "react";
import {useSelector} from "react-redux";
import Users from "./Users";

const UsersContainer = ({
                            currentPage,
                            pageSize,
                            usersPerPage,
                            getUsersThunk,
                            followUserThunk,
                            unfollowUserThunk
                        }) => {

    const totalCount = useSelector(state => state.usersPage.totalCount)
    const nightMode = useSelector(state => state.app.nightMode)
    const followingProgress = useSelector(state => state.usersPage.followingProgress)
    const users = useSelector(state => state.usersPage.users)

    const handleFollowUser = (userId) => followUserThunk(userId)
    const handleUnFollowUser = (userId) => unfollowUserThunk(userId)

    const truncateUserData = (userName) => userName.length > 7 ? userName.slice(0, 7) + '...' : userName

    ///Paginator
    const handlePageChange = (currentPage) => getUsersThunk({currentPage, usersPerPage})
    const paginatorProps = [currentPage, totalCount, pageSize, handlePageChange]
    return <Users {...{
        nightMode, users, followingProgress,
        handleFollowUser, handleUnFollowUser, truncateUserData, paginatorProps
    }}/>
}

export default UsersContainer




































































































