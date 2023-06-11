import React from 'react';
import {dataUploaded} from "../../redux/profile/constants";

const EditProfileData = ({
                             handleSubmit,
                             largePhoto,
                             uploadPhoto,
                             email,
                             handleAvatarClick,
                             handleChange,
                             values,
                             errors,
                             contactsData,
                             hiddenFileInput,
                             fetchUserData,
                             userDataUploadStatus,
                         }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className={"edit-profile-page-container"}>
                <div className={"edit-profile-avatar-part"}>
                    <p style={{"font-size": "1.2rem"}}>Edit Photo</p>
                    <img className={"edit-profile-avatar"} src={largePhoto} alt="edit-avatar"/>
                    <input ref={hiddenFileInput}
                           hidden={true} type={"file"}
                           onChange={uploadPhoto}/>
                    <button type="button" className={"upload-avatar-button"} onClick={handleAvatarClick}>Upload photo
                    </button>
                    <p className={"edit-profile-email"}>{email}</p>
                </div>
                <div className={"edit-profile-data-part"}>
                    <p className={"edit-profile-title"}>Edit Profile</p>
                    <div className="edit-profile-mobile-avatar-block">
                        <img className={"edit-profile-avatar"} src={largePhoto} alt="avatar-edit-mobile"/>
                        <input ref={hiddenFileInput}
                               hidden={true} type={"file"}
                               onChange={uploadPhoto}/>
                        <button type="button" className={"upload-avatar-button"} onClick={handleAvatarClick}>Upload
                            photo
                        </button>
                    </div>
                    <div className={"data-first-block"}>
                        <div className={"data-name-block"}>
                            <input id={"name"} type="text" className={"edit-profile-input"} placeholder={"Name"}
                                   onChange={handleChange} value={values.name}/>
                            <p className={"data-first-block-errors"}>
                                <span>{errors.name}</span>
                            </p>
                        </div>
                        <div className={"data-about-block"}>
                            <input id={"about"} type="text"
                                   className={"edit-profile-input"}
                                   placeholder={"About info"}
                                   onChange={handleChange}
                                   value={values.about}/>
                            <p className={"data-first-block-errors"}>
                                <span>{errors.about}</span>
                            </p>
                        </div>
                    </div>
                    <div className={"data-second-block"}>
                        <div className={"edit-profile-checkbox-block"}>
                            <span className={"applicant-label"}>Are you looking for a job?</span>
                            <input id={"isApplicant"} type="checkbox" checked={values.isApplicant === true}
                                   onChange={handleChange} value={values.isApplicant}/>
                        </div>
                        <div className={"edit-profile-job-description-block"} hidden={values.isApplicant === false}>
                            <p className={"job-description-label"}>Enter job description</p>
                            <input id={"description"} type="text"
                                   className={"edit-profile-job-description-input"}
                                   placeholder={"enter a job description"}
                                   onChange={handleChange}
                                   value={values.description}/>
                            <p className={"edit-profile-job-description-error"}>
                                <span>
                                    {errors.description}
                                </span>
                            </p>
                            <div className={"edit-profile-mobile-contacts-container"}>
                                <p>Your contacts</p>
                                <div className="edit-profile-mobile-contacts-block">
                                    {contactsData.map(contact => <input id={contact.id} onChange={contact.change}
                                                                        className={"edit-profile-mobile-contact-input"}
                                                                        type={"text"} value={contact.value}
                                                                        placeholder={`${contact.id} url`}/>)}
                                </div>
                            </div>
                        </div>
                        <div className={"submit-btn-container"}>
                            {userDataUploadStatus === dataUploaded && <p className={"submit-btn-status"}>Data loaded</p>}
                            <button className={"edit-profile-page-submit-btn"} type={"submit"}
                                    onSubmit={handleSubmit}>{fetchUserData ?
                                <i className="fa fa-spinner fa-spin"/> : "Submit"}
                            </button>
                        </div>

                    </div>
                </div>
                <div className={"edit-profile-contacts-part"}>
                    <p className={"edit-profile-contact-title"}>Edit your Contacts</p>
                    <div className={"edit-profile-page-contacts"}>
                        {contactsData.map(contact =>
                            <div className={"edit-profile-contact-block"}>
                                <p className={"edit-profile-contact-label"}>{contact.id}</p>
                                <input id={contact.id} onChange={contact.change}
                                       className={"edit-profile-contact-input"}
                                       type="text" value={contact.value}
                                       placeholder={`${contact.id} url`}
                                />
                                <div className={"contact-error-container"}>
                                    <p className={"contact-error"}>{contact.error}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default EditProfileData;