import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {connect} from "react-redux";
import {getCaptchaTC, mainLoginTC} from "../../redux/authSlice";
import {Link} from "react-router-dom";
import {authDataFetchingAC} from "../../redux/commonSlice";

const SignInBlock = (props) => {
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
            debugger
            props.mainLoginTC({email, password, rememberMe, antiBotSymbols})
        }
    })

    let values = formik.values
    let errors = formik.errors
    let handleChange = formik.handleChange
    let handleSubmit = formik.handleSubmit
    let touched = formik.touched
    let handleBlur = formik.handleBlur
    let isFetch = props.loginFetch

    return (
        <form onSubmit={handleSubmit}>
            <div className={"login-page-right-part-signIn-block"}>
                <div>
                    <p className={"login-page-welcome-label"}>Welcome to React students community</p>
                    <p className={"login-page-signIn-label"}>Sign in</p>
                    <div className={"login-page-input-container"}>
                        {errors.email && touched.email ?
                            <p className={"login-page-input-error"}>{errors.email}</p> : null}
                        <input className={"login-page-inputs"}
                               id={"email"}
                               type="text"
                               placeholder={"userName"}
                               value={values.email}
                               onChange={handleChange}
                               onBlur={handleBlur}
                        />
                    </div>
                    <div className={"login-page-input-container"}>
                        {touched.password && errors.password ?
                            <p className={"login-page-input-error"}>{errors.password}</p> : null}
                        <p className={"login-page-input-error"}>{errors.password && touched.password}</p>
                        <input className={"login-page-inputs"}
                               id={"password"}
                               placeholder={"password"}
                               type="password"
                               value={values.password}
                               onChange={handleChange}
                               onBlur={handleBlur}
                        />
                    </div>
                    {props.captcha &&
                        <div className={"login-page-captcha-block"}>
                            <img
                                className={"login-page-captcha-image"}
                                src={props.captcha}/>
                            <div>
                                <input className={"login-page-captcha-input"} placeholder={'enter symbols'}
                                       value={values.antiBotSymbols} onChange={handleChange}
                                       id={'antiBotSymbols'}/>
                            </div>
                        </div>}
                    <div className={"login-page-rememberMe-container"}>
                        <input
                            id={"rememberMe"}
                            value={values.rememberMe}
                            checked={values.rememberMe}
                            type={"checkbox"}
                            className={"login-page-rememberMe-checkBox"}
                            onChange={handleChange}/>
                        <label>Remember me</label>
                    </div>
                    <div className={"login-page-login-button-container"}>
                        <button className={"login-page-login-button"} type={"submit"} disabled={!isFetch}>
                            {!isFetch ? <i className="fa fa-spinner fa-spin"/> : "Log in"}
                        </button>
                        <div className={"mobile-signUp-block"}>
                            <p>Not a member?</p>
                            <Link to={"//social-network.samuraijs.com/signUp"} className={"mobile-signUp-button"}>Sign
                                up</Link>
                        </div>

                        {props.error &&
                            <p className={"login-page-auth-error"}>{props.errorMessage}</p>}
                    </div>
                </div>
            </div>
        </form>
    );
}

let mapStateToProps = (state) => {
    return {
        currentUser: state.auth.id,
        auth: state.auth.isLogged,
        error: state.auth.error,
        captcha: state.auth.captcha,
        errorMessage: state.auth.errorMessage,
        loginFetch: state.common.fetchAuthData,
    }
}

export default connect(mapStateToProps,
    {
        mainLoginTC, getCaptchaTC
    }
)(SignInBlock);