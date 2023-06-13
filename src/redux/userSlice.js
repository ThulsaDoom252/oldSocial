import {apiCaller} from "../api/api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

Array.prototype.remove = function (value) {
    this.splice(this.indexOf(value), 1);
}

const usersSlice = createSlice({
    name: 'users-slice',
    initialState: {
        users: [],
        usersPerPage: 10,
        friends: [],
        pageSize: 10,
        totalCount: 19607,
        currentPage: 2,
        fetchUsers: false,
        followingProgress: [],
    },
    reducers: {
        followUser(state, action) {
            state.users = state.users.map(user => user.id === action.payload ? {...user, isFollow: true} : user)
        },
        unFollowUser(state, action) {
            state.users = state.users.map(user => user.id === action.payload ? {...user, isFollow: false} : user)
        },
        getFriends(state, action) {
            state.friends = [...action.payload]
        },
        unFollowFriend(state, action) {
            state.friends = state.friends.filter(friend => friend.id !== action.payload)
        },
        getUsers(state, action) {
            state.users = [...action.payload]
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        toggleFetchUsers(state, action) {
            state.fetchUsers = action.payload
        },
        followingProgressRelay(state, action) {
            const {userid, isFetching} = action.payload
            state.followingProgress = isFetching ? [...state.followingProgress, userid]
                : state.followingProgress.filter(id => id !== userid)
        },
    },
})
export default usersSlice.reducer

export const {
    followUser,
    unFollowUser,
    followingProgressRelay,
    toggleFetchUsers,
    getFriends,
    unFollowFriend,
    setCurrentPage,
    getUsers
} = usersSlice.actions


//THUNKS
export const followUserThunk = createAsyncThunk('follow-thunk', async (userid, {dispatch}) => {
    dispatch(followingProgressRelay({isFetching: true, userid}))
    const data = await apiCaller.follow(userid)
    if (data.resultCode === 0) {
        dispatch(followUser(userid))
    }
    dispatch(followingProgressRelay({isFetching: false, userid}))
})

export const unfollowUserThunk = createAsyncThunk('unfollow-thunk', async (userid, {dispatch}) => {
    dispatch(followingProgressRelay({isFetching: true, userid}))
    const data = await apiCaller.unFollow(userid)
    if (data.resultCode === 0) {
        dispatch(unFollowUser(userid))
    }
    dispatch(followingProgressRelay({isFetching: false, userid}))
})


export const getUsersThunk = createAsyncThunk('getUsers-thunk', async ({currentPage, usersPerPage}, {dispatch}) => {
    dispatch(toggleFetchUsers(true))
    const data = await apiCaller.getUsers(currentPage, usersPerPage)
    dispatch(getUsers(data.items))
    debugger
    dispatch(setCurrentPage(currentPage))
    dispatch(toggleFetchUsers(false))

})

export const getFriendsThunk = createAsyncThunk('getFriends-thunk', async (count, {dispatch}) => {
    dispatch(toggleFetchUsers(true))
    const data = await apiCaller.getFriends(count)
    dispatch(getFriends(data.items))
    dispatch(toggleFetchUsers(false))
})

export const unfollowFriendThunk = createAsyncThunk('unfollow-friend-tc', async ({friendId, index}, {dispatch}) => {
    await apiCaller.unFollow(friendId)
    dispatch(unFollowFriend(friendId, index))
})
















