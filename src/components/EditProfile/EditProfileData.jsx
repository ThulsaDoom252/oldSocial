import React from 'react';
import {AiOutlineInfoCircle} from "react-icons/ai";

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
                             handleApplicantData,
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
                            <p className={"data-label"}>Username:</p>
                            <input id={"name"} type="text"
                                   className={`edit-profile-input ${errors.name && "edit-profile-input-error"}`}
                                   placeholder={"Name"}
                                   onChange={handleChange} value={values.name}/>
                            <p className={"data-first-block-errors"}>
                                {errors.name}
                            </p>
                        </div>
                        <div className={"data-about-block"}>
                            <p className={"data-label"}>About you:</p>
                            <input id={"about"} type="text"
                                   className={`edit-profile-input ${errors.about && "edit-profile-input-error"}`}
                                   placeholder={"About info"}
                                   onChange={handleChange}
                                   value={values.about}/>
                            <p className={"data-first-block-errors"}>
                                {errors.about}
                            </p>
                        </div>
                    </div>
                    <div className={"data-second-block"}>
                        <div className={"edit-profile-checkbox-block"}>
                            <span className={"applicant-label"}>Are you looking for a job?</span>
                            <input id={"isApplicant"} type="checkbox" checked={values.applicant}
                                   onChange={() => handleApplicantData(!values.applicant)} value={values.applicant}/>
                        </div>
                        <div className={"edit-profile-job-description-block"}>
                            <p className={"data-jobDescription-label"}>Enter job
                                description <AiOutlineInfoCircle
                                    title={"Tell about your skills and/or about your dream-job you wish to get"}
                                    className={"data-jobDescription-hint"}/></p>
                            <input id={"description"} type="text"
                                   className={`edit-profile-job-description-input ${errors.description && "edit-profile-input-error"}`}
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
                            {userDataUploadStatus &&
                                <p className={"submit-btn-status"}>Data loaded</p>}
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
                                <p className={"data-label"}>{contact.id}</p>
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