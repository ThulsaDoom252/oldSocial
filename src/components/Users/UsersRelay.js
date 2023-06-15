import React from 'react';
import {compose} from "redux";
import {connect, useSelector} from "react-redux";
import {followUserThunk, getUsersThunk, unFollowUserThunk} from "../../redux/userSlice";
import authHoc from "../HOC/authHoc";
import {useEffect} from "react";
import UsersTemplate from "./UsersTemplate";
import UsersContainer from "./UsersContainer";

const UsersRelay = ({getUsersThunk, followUserThunk, unFollowUserThunk}) => {
    const currentPage = useSelector(state => state.usersPage.currentPage)
    const pageSize = useSelector(state => state.usersPage.pageSize)
    const fetchUsers = useSelector(state => state.usersPage.fetchUsers)
    const usersPerPage = useSelector(state => state.usersPage.usersPerPage)


    useEffect(() => {
        getUsersThunk({currentPage, usersPerPage})
    }, [])


    if (fetchUsers) {
        return <UsersTemplate/>
    }

    return <UsersContainer {...{
        currentPage,
        pageSize,
        getUsersThunk,
        followUserThunk,
        unFollowUserThunk,
        usersPerPage
    }}/>
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLogged,
    }

}

export default compose(connect(mapStateToProps, {
    getUsersThunk,
    followUserThunk,
    unFollowUserThunk
}), authHoc)(UsersRelay)