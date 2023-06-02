import React, {useState} from 'react';
import {connect} from "react-redux";
import {
    changeCurrentContactDataAC,
    setUserTC,
    showOverlayAC,
    updateProfileTC
} from "../../redux/profile/profileSlice";
import {AiOutlineCheck, AiOutlineClose} from "react-icons/all";

function Overlay({
                     photos,
                     currentPhoto,
                     currentContactId: contactId,
                     currentContact,
                     showOverlayPhotoViewport,
                     showOverlayAC,
                     profile: {
                         userId, aboutMe, lookingForAJob, lookingForAJobDescription, fullName,
                         contacts: {vk, github, instagram, facebook, mainLink, website, youtube, twitter}
                     },
                     changeCurrentContactDataAC,
                     updateProfileTC: updateProfile,
                     setUserTC: setUser,
                 }) {

    // updated

    let contacts = [
        {id: "youtube", value: youtube},
        {id: "facebook", value: facebook},
        {id: "vk", value: vk},
        {id: "instagram", value: instagram},
        {id: "twitter", value: twitter},
        {id: "website", value: website},
        {id: "github", value: github},
        {id: "mainLink", value: mainLink}
    ]

    const submitData = () => {
        contacts.forEach(contact => contact.id === contactId ? contact.value = currentContact : null)
        updateProfile(userId, aboutMe, lookingForAJob, lookingForAJobDescription, fullName, contacts[6].value, contacts[2].value, contacts[1].value, contacts[3].value, contacts[4].value, contacts[5].value, contacts[0].value, contacts[7].value)
        setUser(userId)
    }
    return (
        <div className={"overlay"} onClick={() => showOverlayPhotoViewport && showOverlayAC(false)}>
            <div hidden={!showOverlayPhotoViewport} className={"profile-photo-viewPort"}>
                <img className={"currently-viewing-photo"} src={photos[currentPhoto]} alt="photo"/>
            </div>
            <form action="" hidden={showOverlayPhotoViewport}>
                <div className={"profile-contact-viewport"}>
                    <input type="text" value={currentContact}
                           onChange={(e) => changeCurrentContactDataAC(e.currentTarget.value)}
                           placeholder={"enter contact info here"} className={"currently-viewing-contact"}/>
                    <p className={"currently-viewing-contact-submit-button-container"}>
                        <button style={{"color": "red"}} className={"currently-viewing-contact-button"}
                                onClick={() => showOverlayAC(false)}>
                            <AiOutlineClose/></button>
                        <button style={{"color": "green"}} className={"currently-viewing-contact-button"}
                                onClick={() => {
                                    submitData()
                                    showOverlayAC(false)
                                }}>
                            <AiOutlineCheck/></button>
                    </p>
                </div>
            </form>
        </div>
    );
}

let mapStateToProps = state => {
    return {
        photos: state.profilePage.defaultPhotos,
        currentPhoto: state.profilePage.selectedPhoto,
        currentContact: state.profilePage.selectedContact,
        currentContactId: state.profilePage.selectedContactId,
        showOverlayPhotoViewport: state.profilePage.showOverlayPhotoViewport,
        profile: state.profilePage.profile,
    }
}

export default connect(mapStateToProps, {
    showOverlayAC,
    updateProfileTC,
    changeCurrentContactDataAC,
    setUserTC
})(Overlay);