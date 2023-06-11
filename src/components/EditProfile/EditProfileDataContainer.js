import React, {useEffect} from 'react';
import {useFormik} from 'formik'
import * as Yup from "yup";
import {connect} from "react-redux";
import {updatePhotoTC, updateProfileTC} from "../../redux/profile/profileSlice";
import EditProfileData from "./EditProfileData";
import {allData} from "../../redux/profile/constants";

const EditProfileDataContainer = ({
                                      email,
                                      profile,
                                      contacts,
                                      photos,
                                      userDataUploadStatus,
                                      fetchUserData,
                                      updatePhotoTC,
                                      updateProfileTC,
                                  }) => {

    window.fetchUserData = fetchUserData

    const {fullName: name, aboutMe: about, lookingForAJob: applicant, lookingForAJobDescription: description} = profile
    const [facebook, website, vk, twitter, instagram, youtube, github, mainLink] = contacts
    const {large: largePhoto} = photos


    const hiddenFileInput = React.useRef(null);

    const uploadPhoto = (e) => {
        updatePhotoTC(e.target.files[0])
    }
    const handleAvatarClick = event => hiddenFileInput.current.click()

    const {handleSubmit, handleChange, values, errors} = useFormik({
        initialValues: {
            name, about, applicant, description,
            website: website.value,
            vk: vk.value,
            facebook: facebook.value,
            twitter: twitter.value,
            instagram: instagram.value,
            github: github.value,
            mainlink: mainLink.value,
            youtube: youtube.value,

        },
        validationSchema: Yup.object({
            name: Yup.string().min(3, 'Name must be longer than 3 characters').required(),
            about: Yup.string().min(3, 'Must contain more than 3 characters!').required(),
            description: Yup.string().min(3, 'Description must contain more than 3 characters!').nullable().required(),

        }),
        onSubmit: ({
                       name,
                       about,
                       isApplicant,
                       description,
                       website,
                       vk,
                       facebook,
                       twitter,
                       instagram,
                       youtube,
                       github,
                       mainlink
                   }) => {
            updateProfileTC({
                about, isApplicant, description, name, github, vk, facebook, instagram,
                twitter, website, youtube, mainlink, fetchData: allData,
            })

        }
    })

    const contactsData = contacts.map(contact => ({
        ...contact,
        value: values[contact.id],
        error: errors[contact.id],
        change: handleChange
    }));


    return <EditProfileData {...{
        contactsData,
        handleSubmit,
        handleChange,
        values,
        hiddenFileInput,
        errors,
        userDataUploadStatus,
        uploadPhoto,
        handleAvatarClick,
        largePhoto,
        email,
        fetchUserData,

    }}/>
}

const mapStateToProps = (state) => {
    return {
        userDataUploadStatus: state.profilePage.userDataUploadStatus,
        email: state.auth.email,
        contacts: state.profilePage.contacts,
        photos: state.profilePage.photos,
        fetchUserData: state.profilePage.fetchUserData,
        auth: state.auth.isLogged,
        profile: state.profilePage.profile,
    }
}

export default connect(mapStateToProps, {
    updateProfileTC, updatePhotoTC
})(EditProfileDataContainer);