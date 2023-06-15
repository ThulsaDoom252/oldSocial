import React from 'react';
import {NavLink} from "react-router-dom";
import {RiLogoutBoxRLine} from "react-icons/ri";
import noAvatar from "../../common/avatarLoading.jpg"
import {fetchUiBar, fetchUiHeader} from "../../common/commonData";

const HeaderEmptyTemplate = () => {
    return (
        <div className={'box'} hidden={!isLogged}>
            <header className={"header-container"}>
                {!fetching ? <div className={"header-current-user-block"}>
                    <img className={"header-current-user-avatar"} src={noAvatar}
                         alt={"user-avatar"}/>
                    <NavLink to={`/profile/` + userId}
                             className={"header-current-user-name"}>{fetchUiBar}</NavLink>
                    <button title="logout" className={"header-logout-button"}>
                        <RiLogoutBoxRLine/>
                        <span className={"header-logOut-label"}>{fetchUiBar}</span>
                    </button>
                </div> : fetchUiHeader}
                <div className={"header-navbar"}>
                    <span className={navButtonsClass}>{fetchUiBar}</span>
                    <span className={navButtonsClass}>{fetchUiBar}</span>
                    <span className={navButtonsClass}>{fetchUiBar}</span>
                    <span className={navButtonsClass}>{fetchUiBar}</span>
                    <span className={navButtonsClass}>{fetchUiBar}</span>
                    <span className={navButtonsClass}>{fetchUiBar}</span>
                </div>
            </header>
        </div>
    );
};

export default HeaderEmptyTemplate;