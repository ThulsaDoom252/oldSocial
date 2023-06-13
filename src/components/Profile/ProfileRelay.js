import React, {useEffect} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import authHoc from "../HOC/authHoc";
import withRouter from "../HOC/withRouter";
import ProfileContainer from "./ProfileContainer";
import {initializeProfileThunk} from "../../redux/appSlice";
import EmptyProfileTemplate from "./EmptyProfileTemplate";

const ProfileRelay = (props, {showMobileVersion}) => {
    const {initializeProfileTC} = props
    const userIdRouterParam = props.router.params.userId
    useEffect(() => {
        initializeProfileTC(userIdRouterParam)
        debugger
    }, [userIdRouterParam])

    if (!props.profileInitialized) return <EmptyProfileTemplate {...{showMobileVersion}}/>

    return (
        <ProfileContainer {...{userIdRouterParam}}/>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLogged,
        profileInitialized: state.app.profileInitialized,
        showMobileVersion: state.app.showMobileVersion,

    }
}

export default compose(connect(mapStateToProps, {initializeProfileTC: initializeProfileThunk}), authHoc, withRouter)(ProfileRelay)


