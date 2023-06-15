import {apiCaller} from "../api/api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

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
        followUserFetch: null,
        friendsCount: 100,
    },
    reducers: {
        followUser(state, action) {
            state.users = state.users.map(user => user.id === action.payload ? {...user, followed: true} : user)
        },
        unFollowUser(state, action) {
            state.users = state.users.map(user => user.id === action.payload ? {...user, followed: false} : user)
        },
        setUsersTotalCount(state, action) {
            state.totalCount = action.payload
        },
        getFriends(state, action) {
            state.friends = [...action.payload]
        },
        addFriend(state, action) {
            const {userId, userData} = action.payload
            let friend
            if (userData) {
                friend = userData
            } else {
                friend = state.users.find(user => user.id === userId)
            }
            state.friends = [...state.friends, friend]
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
        toggleFollowFetch(state, action) {
            state.followUserFetch = action.payload
        },
    },
})
export default usersSlice.reducer

export const {
    followUser,
    unFollowUser,
    toggleFollowFetch,
    toggleFetchUsers,
    setUsersTotalCount,
    getFriends,
    unFollowFriend,
    setCurrentPage,
    getUsers,
    addFriend,
} = usersSlice.actions

//THUNKS
export const followUserThunk = createAsyncThunk('follow-thunk', async ({userId, userData}, {dispatch}) => {
    dispatch(toggleFollowFetch(userId))
    const data = await apiCaller.follow(userId)
    if (data.resultCode === 0) {
        dispatch(followUser(userId))
        dispatch(addFriend({userId, userData}))
    }
    dispatch(toggleFollowFetch(null))
})

export const unFollowUserThunk = createAsyncThunk('unfollow-thunk', async ({userId, userData}, {dispatch}) => {
    dispatch(toggleFollowFetch(userId))
    const data = await apiCaller.unFollow(userId)
    if (data.resultCode === 0) {
        dispatch(unFollowUser(userId))
        dispatch(unFollowFriend(userId))
    }
    dispatch(toggleFollowFetch(null))
})


export const getUsersThunk = createAsyncThunk('getUsers-thunk', async ({currentPage, usersPerPage}, {dispatch}) => {
    dispatch(toggleFetchUsers(true))
    const data = await apiCaller.getUsers(currentPage, usersPerPage)
    dispatch(getUsers(data.items))
    dispatch(setUsersTotalCount(data.totalCount))
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
    dispatch(toggleFollowFetch(friendId))
    await apiCaller.unFollow(friendId)
    dispatch(unFollowFriend(friendId, index))
    dispatch(toggleFollowFetch(null))
})
















