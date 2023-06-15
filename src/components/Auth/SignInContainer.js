import React, {useState} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {connect, useSelector} from "react-redux";
import {getCaptchaThunk, loginThunk} from "../../redux/authSlice";
import SignIn from "./SignIn";
import {Navigate} from "react-router-dom";
import SignUpBlock from "./SignUpBlock";
import SignInLeftPart from "./SignInLeftPart";
import {delay} from "../../common/commonFuncs";

const SignInContainer = ({currentUser, isAuthorized, authError, captcha, errorMessage, loginThunk}) => {
    if (isAuthorized) return <Navigate to={`/profile/${currentUser}`}/>
    const [showSignInBlock, toggleShowSignInBlock] = useState(true)
    const [signButtonDisabled, disableSignButton] = useState(false)
    const handleSwitchAuthorizedMode = () => toggleShowSignInBlock(!showSignInBlock)
    const handleDisableSignInButton = async () => {
        handleSwitchAuthorizedMode()
        disableSignButton(true)
        await delay(1000)
        disableSignButton(false)
    }

    const loginFetch = useSelector(state => state.auth.loginFetch)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            antiBotSymbols: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().max(50, 'email must be shorter than 10 characters').required(),
            password: Yup.string().min(6, 'password must contain at least 6 characters').required(),
        }),
        onSubmit: ({email, password, rememberMe, antiBotSymbols}) => {
            loginThunk({email, password, rememberMe, antiBotSymbols})
        }
    })


    const values = formik.values
    const errors = formik.errors
    const handleChange = formik.handleChange
    const handleSubmit = formik.handleSubmit
    const touched = formik.touched
    const handleBlur = formik.handleBlur

    return (
        <div className={"login-page-container"}>
            <SignInLeftPart {...{showSignInBlock, signButtonDisabled, handleDisableSignInButton}}/>
            <div className={"login-page-right-part-container"}>
                {!showSignInBlock && <SignUpBlock/>}
                {showSignInBlock && <SignIn  {...{
                    handleChange, handleBlur, handleSubmit, values, errors,
                    touched, loginFetch, errorMessage, authError, captcha
                }}/>}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.id,
        isAuthorized: state.auth.isLogged,
        authError: state.auth.error,
        captcha: state.auth.captcha,
        errorMessage: state.auth.errorMessage,
        id: state.auth.id,
    }
}

export default connect(mapStateToProps,
    {
        loginThunk, getCaptchaThunk
    }
)(SignInContainer);

