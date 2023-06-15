import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
})

//---------------------------------------------------------------------------USERS API
export const apiCaller = {
    getUsers: (currentPage, usersPerPage = 20) => {
        return (
            instance.get(`users?page=${currentPage}&count=${usersPerPage}`)
                .then(response => {
                    return response.data
                })
        )
    },
    getRandomUsers: (randomPage, count) => {
        return (
            instance.get(`users?page=${randomPage}&count=${count}`).then(response => {
                return response.data
            })
        )
    },
    getFriends: (count) => {
        return (
            instance.get(`users?friend=true&count=${count}`).then(response => {
                return response.data
            })
        )
    },
    setUsers: (userId) => {
        return profileApi.getUserProfileData(userId)
    },
    unFollow: (userId) => {
        return (
            instance.delete(`follow/` + userId)
                .then(response => {
                    return response.data
                })
        )
    },
    follow: (userId) => {
        return (
            instance.post(`follow/` + userId, {})
                .then(response => {
                    return response.data
                })
        )
    }
}

//---------------------------------------------------------------------------AUTH API
export const login = {
    auth: () => {
        return loginApi.checkAuth()
    }
}
//---------------------------------------------------------------------------PROFILE API
export const profileApi = {
    getUserProfileData: (userId) => {
        return (
            instance.get('profile/' + userId)
                .then(response => {
                    return response
                })
                .catch(response => response)
        )
    },

    getStatus(userId) {
        return instance.get('profile/status/' + userId)

    },

    updateStatus(status) {
        return instance.put('profile/status/', {status}).then(response => {
            return response.data
        })

    },

    updatePhoto(photo) {
        const formData = new FormData()
        formData.append("image", photo)
        return instance.put('profile/photo/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    updateProfile(userid, aboutMe, lookingForAJob, LookingForAJobDescription,
                  fullName, github, vk, facebook, instagram, twitter,
                  website, youtube, mainLink) {
        debugger
        return instance.put('profile/', {
            userid, aboutMe, lookingForAJob,
            LookingForAJobDescription, fullName, contacts: {
                github, vk, facebook, instagram, twitter,
                website, youtube, mainLink
            }
        })
        debugger

    },

}

//**************************LOGIN API***********************************************
export const loginApi = {
    checkAuth: () => {
        return instance.get('auth/me').then(response => {
                return response.data
            }
        )
    },

    getCaptcha: () => {
        return instance.get('/security/get-captcha-url')

    },

    logIn(email, password, rememberMe, antiBotSymbols) {
        return instance.post('auth/login/', {
            email,
            password,
            rememberMe,
            captcha: antiBotSymbols
        }).then(response => {
            return response.data
        })
    },

    logOut() {
        return instance.delete('auth/login/').then(response => {
            return response.data
        })
    }
}










