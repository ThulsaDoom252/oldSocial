import {SiFacebook, SiGithub, SiInstagram, SiTwitter, SiVk, SiYoutube} from "react-icons/si";
import {CgWebsite} from "react-icons/cg";
import React from "react";
import {facebook, github, instagram, twitter, vk, website, youtube} from "./commonData";

export const truncateUserData = (data) => data.length > 7 ? data.slice(0, 7) + '...' : data
export const delay = (ms) => new Promise((resolve) => setTimeout(() => {
    resolve()
}, ms))

export const getContactIcon = (contactId, values) => {
    switch (contactId) {
        case youtube:
            return <SiYoutube title={values[contactId]}/>
        case instagram:
            return <SiInstagram title={values[contactId]}/>
        case vk:
            return <SiVk title={values[contactId]}/>
        case twitter:
            return <SiTwitter title={values[contactId]}/>
        case facebook:
            return <SiFacebook title={values[contactId]}/>
        case website:
            return <CgWebsite title={values[contactId]}/>
        case github:
            return <SiGithub title={values[contactId]}/>
        default:
            void 0
    }
}