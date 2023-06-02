import React, {useEffect} from 'react';
import {Navigate, NavLink} from "react-router-dom";
import {connect} from "react-redux";

const Greetings = (props) => {
    if (props.auth === true) {
        return <Navigate to={"/profile"}/>
    } else {
        return (
            <div>
                <div>Welcome to the best social network in the world</div>
                <NavLink to={"/login"}>Login</NavLink>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLogged
    }
}

export default connect(mapStateToProps)(Greetings);