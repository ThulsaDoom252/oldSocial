import {SiFacebook, SiGithub, SiInstagram, SiTwitter, SiVk, SiYoutube} from "react-icons/si";
import React from "react";
import {CgWebsite} from "react-icons/cg";

export const youtube = "youtube"
export const instagram = "instagram"
export const vk = "vk"
export const github = "github"
export const mainLink = "mainLink"
export const twitter = "twitter"
export const facebook = "facebook"
export const website = "website"

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


