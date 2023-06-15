import React from 'react';
import noAvatar from "../../common/avatarLoading.jpg"
import {fetchUiBar} from "../../common/commonData";

const EditProfileDataEmptyTemplate = () => {
    return (
        <form>
            <div className={"edit-profile-page-container"}>
                <div className={"edit-profile-avatar-part"}>
                    <p style={{"font-size": "1.2rem"}}>Edit Photo</p>
                    <img className={"edit-profile-avatar"} src={noAvatar} alt="edit-avatar"/>
                    <button type="button" className={"upload-avatar-button"}>Upload photo
                    </button>
                    <p className={"edit-profile-email"}>{fetchUiBar}</p>
                </div>
                <div className={"edit-profile-data-part"}>
                    <p className={"edit-profile-title"}>Edit Profile</p>
                    <div className="edit-profile-mobile-avatar-block">
                        <img className={"edit-profile-avatar"} src={noAvatar} alt="avatar-edit-mobile"/>
                        <button type="button" className={"upload-avatar-button"} >Loading...
                        </button>
                    </div>
                    <div className={"data-first-block"}>
                        <div className={"data-name-block"}>
                            <input id={"name"} type="text" className={"edit-profile-input"} placeholder={"Name"}
                                value = 'loading...'/>
                        </div>
                        <div className={"data-about-block"}>
                            <input  type="text"
                                   className={"edit-profile-input"}
                                   value={"loading..."}/>
                        </div>
                    </div>
                    <div className={"data-second-block"}>
                        <div className={"edit-profile-checkbox-block"}>
                            <span className={"applicant-label"}>Are you looking for a job?</span>
                            <input type="checkbox" checked= {false}/>
                        </div>
                        <div className={"edit-profile-job-description-block"} hidden={true}>
                            <p className={"job-description-label"}>Enter job description</p>
                            <input id={"description"} type="text"
                                   className={"edit-profile-job-description-input"}
                                   value={"loading..."}/>
                            <div className={"edit-profile-mobile-contacts-container"}>
                                <p>Your contacts</p>
                                <div className="edit-profile-mobile-contacts-block">
                                    {fetchUiBar}
                                </div>
                            </div>
                        </div>
                        <button className={"edit-profile-page-submit-button"} type={"submit"}
                                >Loading....
                        </button>
                    </div>
                </div>
                <div className={"edit-profile-contacts-part"}>
                    <p className={"edit-profile-contact-title"}>Edit your Contacts</p>
                    <div className={"edit-profile-page-contacts"}>
                        {fetchUiBar}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default EditProfileDataEmptyTemplate;