import React from 'react';
import notFound from "./404.png"
import trav from "./trav.gif"
import authHoc from "../HOC/authHoc";
import {compose} from "redux";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

const NotFoundPage = (props) => {
    const {id : currentUser} = props
    return (
        <div className="not-found-container">
            <img className="not-found-image" src={trav}/>
            <div className="not-found-text-block">
                <p className={"not-found-label-1"}>404</p>
                <p className={"not-found-label-2"}>Error</p>
                <NavLink to={`/profile/${currentUser}`} className={"not-found-button"}>Go back to home page</NavLink>
            </div>
        </div>
    );
}

let loginCheck = (state) => {
    return {
        auth: state.auth.isLogged,
        id: state.auth.id
    }
}

export default compose(connect(loginCheck), authHoc)(NotFoundPage);
