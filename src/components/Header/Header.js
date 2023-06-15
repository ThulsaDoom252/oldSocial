import React from 'react';
import {NavLink} from "react-router-dom";
import {BiMessageSquareDetail} from "react-icons/bi"
import {FaUserFriends} from "react-icons/fa"
import {ImUsers} from "react-icons/im"
import {IoSettingsOutline} from "react-icons/io5"
import {RiLogoutBoxRLine} from "react-icons/ri"
import {TfiGallery, TfiUser} from "react-icons/tfi"
import defaultAvatar from "../common/default-avatar.jfif"

const Header = ({userId, handleLogOut, userName, isLogged, currentUserAvatar}) => {
    const navButtonsClass = "header-navbar-button"
    const navButtonsActiveClass = "header-navbar-button-active"
    return (
        <div className={'box'} hidden={!isLogged}>
            <header className={"header-container"}>
                <div className={"header-current-user-block"}>
                    <div className={"header-current-avatar-item"}>
                        <img className={"header-current-avatar"}
                             src={currentUserAvatar ? currentUserAvatar : defaultAvatar}
                             alt={"user-avatar"}/>
                    </div>
                    <NavLink to={`/profile/` + userId}
                             className={"header-current-user-name"}>{userName}</NavLink>
                    <button title="logout" className={"header-logout-button"} onClick={handleLogOut}>
                        <RiLogoutBoxRLine/>
                        <span className={"header-logOut-label"}>Log out</span>
                    </button>
                </div>
                <div className={"header-navbar"}>
                    <NavLink className={state => state.isActive ? navButtonsActiveClass : navButtonsClass}
                             to={`/profile/${userId}`}><TfiUser/>Profile</NavLink>
                    <NavLink className={state => state.isActive ? navButtonsActiveClass : navButtonsClass}
                             to={'/messages'}><BiMessageSquareDetail/>Messages</NavLink>
                    <NavLink className={state => state.isActive ? navButtonsActiveClass : navButtonsClass}
                             to={'/gallery'}><TfiGallery/>Photos</NavLink>
                    <NavLink className={state => state.isActive ? navButtonsActiveClass : navButtonsClass}
                             to={"/friends"}><FaUserFriends/>Friends</NavLink>
                    <NavLink className={state => state.isActive ? navButtonsActiveClass : navButtonsClass}
                             to={"/users"}><ImUsers/>Users</NavLink>
                    <NavLink className={state => state.isActive ? navButtonsActiveClass : navButtonsClass}
                             to={"/settings"}><IoSettingsOutline/>Settings</NavLink>
                </div>
            </header>
        </div>
    )
}

export default Header



