import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import authHoc from "../HOC/authHoc";
import {toggleOverlay} from "../../redux/profile/profileSlice";
import Gallery from "./Gallery";

const GalleryContainer = ({photos, dispatch, toggleOverlay, nightMode}) => {
    const handleOverlay = (index) => {
        dispatch(toggleOverlay({showOverlay: true, showPhotoViewPort: true, index}))
    }

    return <Gallery {...{handleOverlay, photos, nightMode}}/>
}

const mapStateToProps = state => {
    return {
        photos: state.profilePage.userPhotos,
        auth: state.auth.isLogged,
    }
}

export default compose(connect(mapStateToProps, {toggleOverlay}), authHoc)(GalleryContainer);