import React from 'react';
import {NavLink} from "react-router-dom";
import {
    BiMessageSquareDetail,
    FaUserFriends,
    ImUsers,
    IoSettingsOutline,
    RiLogoutBoxRLine, TfiGallery,
    TfiUser
} from "react-icons/all";
import {fetchUiHeader} from "../../redux/commonSlice";

const Header = ({userId, handleLogOut, userName, isLogged, avatar, fetching}) => {
    const navButtonsClass = "header-navbar-button"
    const navButtonsActiveClass = "header-navbar-button-active"
    return (
        <div className={'box'} hidden={!isLogged}>
            <header className={"header-container"}>
                {!fetching ? <div className={"header-current-user-block"}> {avatar &&
                    <img className={"header-current-user-avatar"} src={avatar}
                         alt={"user-avatar"}/>}
                    <NavLink to={`/profile/` + userId}
                             className={"header-current-user-name"}>{userName}</NavLink>
                    <button title="logout" className={"header-logout-button"} onClick={handleLogOut}>
                        <RiLogoutBoxRLine/>
                        <span className={"header-logOut-label"}>Log out</span>
                    </button>
                </div> : fetchUiHeader}
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



