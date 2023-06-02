import {apiCaller} from "../api/api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

Array.prototype.remove = function (value) {
    this.splice(this.indexOf(value), 1);
}

const usersSlice = createSlice({
    name: 'users-slice',
    initialState: {
        users: [],
        friends: [],
        pageSize: 10,
        totalCount: 19607,
        currentPage: 2,
        fetchUsers: false,
        followingProgress: [],
    },
    reducers: {
        follow(state, action) {
            state.users = state.users.map(user => user.id === action.payload ? {...user, isFollow: true} : user)
        },
        unFollow(state, action) {
            state.users = state.users.map(user => user.id === action.payload ? {...user, isFollow: false} : user)
        },
        getFriendsAC(state, action) {
            state.friends = [...action.payload]
        },
        unFollowFriendAC(state, action) {
            state.friends = state.friends.filter(friend => friend.id !== action.payload)
        },
        setUsers(state, action) {
            state.users = [...action.payload]
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        fetchingRelay(state, action) {
            state.fetchUsers = action.payload
        },
        followingProgressRelay(state, action) {
            debugger
            const {userid, isFetching} = action.payload
            debugger
            state.followingProgress = isFetching ? [...state.followingProgress, userid]
                : state.followingProgress.filter(id => id !== userid)
        },
    },
})
export default usersSlice.reducer

export const {
    follow,
    unFollow,
    followingProgressRelay,
    fetchingRelay,
    getFriendsAC,
    unFollowFriendAC,
    setCurrentPage,
    setUsers
} = usersSlice.actions


//THUNKS
export const followTC = createAsyncThunk('follow-thunk', async (userid, {dispatch}) => {
    dispatch(followingProgressRelay({isFetching: true, userid}))
    const data = await apiCaller.follow(userid)
    if (data.resultCode === 0) {
        dispatch(follow(userid))
    }
    dispatch(followingProgressRelay({isFetching: false, userid}))
})

export const unFollowTC = createAsyncThunk('unfollow-thunk', async (userid, {dispatch}) => {
    dispatch(followingProgressRelay({isFetching: true, userid}))
    const data = await apiCaller.unFollow(userid)
    if (data.resultCode === 0) {
        dispatch(unFollow(userid))
    }
    dispatch(followingProgressRelay({isFetching: false, userid}))
})


export const getUsersTC = createAsyncThunk('getUsers-thunk', async ({currentPage, pageSize}, {dispatch}) => {
    dispatch(fetchingRelay(true))
    const data = await apiCaller.getUsers(currentPage, pageSize)
    debugger
    dispatch(fetchingRelay(false))
    dispatch(setUsers(data.items))
    dispatch(setCurrentPage(currentPage))

})

export const getFriendsTC = createAsyncThunk('getFriends-thunk', async (count, {dispatch}) => {
    dispatch(fetchingRelay(true))
    const data = await apiCaller.getFriends(count)
    dispatch(getFriendsAC(data.items))
    dispatch(fetchingRelay(false))
})

export const unfollowFriendTC = createAsyncThunk('unfollow-friend-tc', async ({friendId, index}, {dispatch}) => {
    await apiCaller.unFollow(friendId)
    dispatch(unFollowFriendAC(friendId, index))
})
















