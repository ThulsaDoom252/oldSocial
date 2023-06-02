import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {GiHamburgerMenu} from "react-icons/gi";

const BurgerNavbar = () => {
    const [mobileNavBar, showMobileNavBar] = useState(false)

    const showNavBar = () => {
        showMobileNavBar(true)
    }

    const hideNavBar = () => {
        showMobileNavBar(false)
    }

    return (
        <div  className={"header-burger-navbar"}>
            <button className={"header-burger-navbar-button"}
                    onClick={!mobileNavBar ? showNavBar : hideNavBar}>
                <GiHamburgerMenu/></button>
            <div  hidden={!mobileNavBar} className={"header-burger-navbar-block"}>
                <div className="header-burger-navbar-menu"></div>
                <NavLink to={`/profile`}
                         onClick={hideNavBar}
                         className={navData => navData.isActive ? "burger-item-active" : "burger-item"}>Profile</NavLink>
                <NavLink to={`/messages`}
                         onClick={hideNavBar}
                         className={navData => navData.isActive ? "burger-item-active" : "burger-item"}>Messages</NavLink>
                <NavLink to="/users"
                         onClick={hideNavBar}
                         className={navData => navData.isActive ? "burger-item-active" : "burger-item"}> Users </NavLink>
                <NavLink to="/news"
                         onClick={hideNavBar}
                         className={navData => navData.isActive ? "burger-item-active" : "burger-item"}> News </NavLink>
                <NavLink to="/settings"
                         onClick={hideNavBar}
                         className={navData => navData.isActive ? "burger-item-active" : "burger-item"}> Settings </NavLink>
            </div>
        </div>
    );
}

export default BurgerNavbar;