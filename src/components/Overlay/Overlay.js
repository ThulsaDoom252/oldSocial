import React from 'react';
import {useSelector} from "react-redux";
import {
    changeContactValue,
    changeCurrentContactDataAC,
    setUserTC,
    showOverlayAC,
    updateProfileTC
} from "../../redux/profile/profileSlice";
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";

const Overlay = ({dispatch}) => {
    const staticPhotos = useSelector(state => state.profilePage.defaultPhotos)
    const selectedPhoto = useSelector(state => state.profilePage.selectedPhoto)
    const selectedContact = useSelector(state => state.profilePage.selectedContact)
    const selectedContactId = useSelector(state => state.profilePage.selectedContactId)
    const photoViewPort = useSelector(state => state.profilePage.showOverlayPhotoViewport)
    const profile = useSelector(state => state.profilePage.profile)

    const {userId} = profile

    const handleChangeSelectedContact = (e) => {
        dispatch(changeCurrentContactDataAC(e.currentTarget.value))
    }

    const handleSubmitData = async () => {
        dispatch(changeContactValue({selectedContactId, selectedContact}))
        dispatch(updateProfileTC({}))
        dispatch(setUserTC(userId))
        dispatch(showOverlayAC(false))
    }
    return (
        <div className={"overlay"} onClick={() => photoViewPort && dispatch(showOverlayAC(false))}>
            <div hidden={!photoViewPort} className={"profile-photo-viewPort"}>
                <img className={"currently-viewing-photo"} src={staticPhotos[selectedPhoto]} alt="photo"/>
            </div>
            <form action="" hidden={photoViewPort}>
                <div className={"profile-contact-viewport"}>
                    <input type="text" value={selectedContact}
                           onChange={handleChangeSelectedContact}
                           placeholder={"enter contact info here"} className={"currently-viewing-contact"}/>
                    <p className={"currently-viewing-contact-submit-button-container"}>
                        <button style={{"color": "red"}} className={"currently-viewing-contact-button"}
                                onClick={() => showOverlayAC(false)}>
                            <AiOutlineClose/></button>
                        <button style={{"color": "green"}} className={"currently-viewing-contact-button"}
                                onClick={handleSubmitData}>
                            <AiOutlineCheck/></button>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Overlay