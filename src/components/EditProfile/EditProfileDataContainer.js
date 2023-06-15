import React from 'react';
import {useFormik} from 'formik'
import * as Yup from "yup";
import {connect} from "react-redux";
import {updateAvatarThunk, updateProfileThunk} from "../../redux/profile/profileSlice";
import EditProfileData from "./EditProfileData";
import {allData} from "../../common/commonData";

const EditProfileDataContainer = ({
                                      email,
                                      profile,
                                      contacts,
                                      photos,
                                      userDataUploadStatus,
                                      fetchUserData,
                                      updateAvatarThunk,
                                      updateProfileThunk,
                                  }) => {

    const {fullName: name, aboutMe: about, lookingForAJob: applicant, lookingForAJobDescription: description} = profile
    const [facebook, website, vk, twitter, instagram, youtube, github, mainLink] = contacts
    const {large: largePhoto} = photos


    const hiddenFileInput = React.useRef(null);

    const uploadPhoto = (e) => {
        updateAvatarThunk(e.target.files[0])
    }
    const handleAvatarClick = event => hiddenFileInput.current.click()

    const {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
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
            name: Yup.string().min(3, 'Name must be longer than 3 characters').required("required field"),
            about: Yup.string().min(3, 'Must contain more than 3 characters!').required("required field"),
            description: Yup.string().min(3, 'Description must contain more than 3 characters!').nullable().required("required field"),

        }),
        onSubmit: ({
                       name,
                       about,
                       applicant,
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
            updateProfileThunk({
                about, isApplicant: applicant, description, name, github, vk, facebook, instagram,
                twitter, website, youtube, mainlink, fetchData: allData,
            })

        }
    })

    const handleApplicantData = (data) => {
        setFieldValue("applicant", data)
    }

    window.applicant = values.applicant

    const contactsData = contacts.map(contact => ({
        ...contact,
        value: values[contact.id],
        error: errors[contact.id],
        change: handleChange
    }));


    return <EditProfileData {...{
        contactsData,
        handleSubmit,
        handleApplicantData,
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
    updateProfileThunk, updateAvatarThunk
})(EditProfileDataContainer);