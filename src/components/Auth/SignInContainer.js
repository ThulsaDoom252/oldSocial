import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {connect, useSelector} from "react-redux";
import {getCaptchaThunk, loginThunk} from "../../redux/authSlice";
import SignIn from "./SignIn";

const SignInContainer = ({authError, captcha, errorMessage, mainLoginTC}) => {
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
            mainLoginTC({email, password, rememberMe, antiBotSymbols})
        }
    })

    const values = formik.values
    const errors = formik.errors
    const handleChange = formik.handleChange
    const handleSubmit = formik.handleSubmit
    const touched = formik.touched
    const handleBlur = formik.handleBlur

    return (

        <SignIn  {...{
            handleChange, handleBlur, handleSubmit, values, errors,
            touched, loginFetch, errorMessage, authError, captcha
        }}/>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.id,
        auth: state.auth.isLogged,
        authError: state.auth.error,
        captcha: state.auth.captcha,
        errorMessage: state.auth.errorMessage,
    }
}

export default connect(mapStateToProps,
    {
        mainLoginTC: loginThunk, getCaptchaTC: getCaptchaThunk
    }
)(SignInContainer);

