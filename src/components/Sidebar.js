import React from 'react';
import {NavLink} from "react-router-dom";
import logo from "./common/logo.png"
import {connect} from "react-redux";

function Sidebar(props) {
    const current = props.currentUser
    return (
        <div hidden={true} className={"sidebar"}>
            <img className={"sidebar-logo"} src={logo} alt='logo'/>
            <NavLink className={navData => navData.isActive ? "sidebar-item-active" : "sidebar-item"}
                     to={`/profile/${current}`}>Profile</NavLink>
            <NavLink className={navData => navData.isActive ? "sidebar-item-active" : "sidebar-item"}
                     to={"/messages"}>Messages</NavLink>
            <NavLink className={navData => navData.isActive ? "sidebar-item-active" : "sidebar-item"}
                     to={"/users"}>Users</NavLink>
            <NavLink className={navData => navData.isActive ? "sidebar-item-active" : "sidebar-item"}
                     to={"/news"}>News</NavLink>
            <NavLink className={navData => navData.isActive ? "sidebar-item-active" : "sidebar-item"}
                     to={"/settings"}>Settings</NavLink>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLogged,
        currentUser: state.auth.id,
    }
}

export default connect (mapStateToProps)(Sidebar);