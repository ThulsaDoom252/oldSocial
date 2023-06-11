import React from 'react';
import Status from "./Status";
import {Link} from "react-router-dom";
import {fetchUiSpin} from "../../../redux/commonSlice";
import {nameData} from "../../../redux/profile/constants";

const ProfileAvatarBlock = ({
                                isCurrentUser,
                                directEditMode,
                                defaultAvatar,
                                profileAvatarProps,
                                statusProps,
                            }) => {
    const [handleSubmit, handleChange, uploadPhoto, handleAvatarClick, nameEditMode, setNameEditMode,
        contactsBlockEditMode, setContactsBlockEditMode, values, errors, toggleProfileDataEditMode,
        handleContactBlockEditMode, contactsData, pointerCursor, hiddenFileInput, avatar, nameDataFetch, nameDataUploadStatus] = profileAvatarProps

    return (
        <div className="profile-page-center-avatarBlockContainer">
            <form onSubmit={handleSubmit}>
                <div>
                    <input ref={hiddenFileInput}
                           hidden={true} type={"file"}
                           onChange={uploadPhoto}/>
                    <img className="profile-page-avatar"
                         style={pointerCursor}
                         onClick={directEditMode && handleAvatarClick}
                         src={avatar ? avatar : defaultAvatar}
                         alt="large photo"/>
                    <div className={"profile-page-userName-container"}>
                        <p style={pointerCursor}
                           onClick={() => toggleProfileDataEditMode(nameEditMode, setNameEditMode)}
                           className={nameDataUploadStatus ? "profile-page-left-part-name-uploaded" : "profile-page-userName"}>{
                            nameEditMode ?
                                <input style={{"border": errors.fullName ? "solid red thin" : "solid thin"}} type={"text"}
                                       id={"fullName"}
                                       className={"name-input"} onChange={handleChange}
                                       value={values.fullName} autoFocus={true} onBlur={() =>
                                    toggleProfileDataEditMode(nameEditMode, setNameEditMode, nameData)}/> : nameDataFetch ? fetchUiSpin : values.fullName}</p>
                        {errors.fullName && <p className={"profile-page-input-error"}>{errors.fullName}</p>}
                    </div>
                    <Status  {...{statusProps}}/>
                    <div className={"profile-page-left-contacts-block"}>
                        {contactsData.map(contact => <span style={{"color": !contact.value && "gray"}}
                                                           className={`profile-page-left-contact profile-page-left-contact-${contact.id}Icon`}>
                        {contact ? <Link
                            style={{"cursor": !contact.value && "default"}}
                            onClick={e => handleContactBlockEditMode(e, contact.id, contact.value)}
                            to={contact.value && `//${contact.value}`} target={contact.value && "_blank"}>
                            {contact.icon}</Link> : contact.icon}
                        </span>)}
                    </div>
                    {directEditMode && isCurrentUser ? <p
                        className={"direct-contact-edit-button"}
                        style={{"cursor": "pointer"}}
                        onClick={() => toggleProfileDataEditMode(contactsBlockEditMode, setContactsBlockEditMode)}>{contactsBlockEditMode ? "Choose contacts to edit" : "Edit Contacts"}</p> : null}
                </div>
            </form>
        </div>
    );
}

export default ProfileAvatarBlock;

