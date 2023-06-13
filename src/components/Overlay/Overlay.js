import React from 'react';
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";

const Overlay = ({
                     handleCloseOverlay, photoViewPort, userPhotos, selectedPhoto, selectedContact,
                     handleChangeSelectedContact, handleSubmitData
                 }) => {
    return (
        <div className={"overlay"}>
            <button className={"overlay-close-btn"} onClick={handleCloseOverlay}><AiOutlineClose/></button>
            <div hidden={!photoViewPort} className={"overlay-photo-item"}>
                <img className={"overlay-photo"} src={require(`../../redux/profile/${userPhotos[selectedPhoto]}`)}
                     alt="photo"/>
            </div>
            <form hidden={photoViewPort}>
                <div className={"profile-contact-viewport"}>
                    <input type="text" value={selectedContact}
                           onChange={handleChangeSelectedContact}
                           placeholder={"enter contact info here"} className={"currently-viewing-contact"}/>
                    <p className={"currently-viewing-contact-submit-button-container"}>
                        <button style={{"color": "green"}} className={"overlay-contact-update-btn"}
                                onClick={handleSubmitData}>
                            <AiOutlineCheck/></button>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Overlay