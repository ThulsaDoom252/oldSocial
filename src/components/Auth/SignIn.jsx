import {Link} from "react-router-dom";
import React from "react";

const SignIn = ({
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    authError,
                    loginFetch,
                    errorMessage,
                    captcha,
                }) => {
    return (
        <form  className={"signIn-form"} onSubmit={handleSubmit}>
            <div className={"signIn-container"}>
                <div>
                    <p className={"signIn-title"}>Welcome to React students community</p>
                    <p className={"signIn-label"}>Sign in</p>
                    <div className={"signIn-inputs-container"}>
                        {errors.email && touched.email ?
                            <p className={"signIn-input-error"}>{errors.email}</p> : null}
                        <input className={"signIn-input"}
                               id={"email"}
                               type="text"
                               placeholder={"userName"}
                               value={values.email}
                               onChange={handleChange}
                               onBlur={handleBlur}
                        />
                    </div>
                    <div className={"signIn-inputs-container"}>
                        {touched.password && errors.password ?
                            <p className={"signIn-input-error"}>{errors.password}</p> : null}
                        <p className={"signIn-input-error"}>{errors.password && touched.password}</p>
                        <input className={"signIn-input"}
                               id={"password"}
                               placeholder={"password"}
                               type="password"
                               value={values.password}
                               onChange={handleChange}
                               onBlur={handleBlur}
                        />
                    </div>
                    <div className={"rememberMe-container"}>
                        <input
                            id={"rememberMe"}
                            value={values.rememberMe}
                            checked={values.rememberMe}
                            type={"checkbox"}
                            onChange={handleChange}/>
                        <label>Remember me</label>
                    </div>
                    {captcha &&
                        <div className={"signIn-captcha-block"}>
                            <div className={"captcha-image-item"}>
                                <img
                                    className={"captcha-image"}
                                    src={captcha}
                                    alt={'captcha'}
                                />
                            </div>
                            <div>
                                <input className={"signIn-captcha-input"} placeholder={'enter symbols'}
                                       value={values.antiBotSymbols} onChange={handleChange}
                                       id={'antiBotSymbols'}/>
                            </div>
                        </div>}
                    <div className={"signIn-btn-container"}>
                        <button className={authError ? "signIn-btn-error" : "signIn-btn"} type={"submit"}
                                disabled={loginFetch}>
                            {loginFetch ? <i className="fa fa-spinner fa-spin"/> : "Log in"}
                        </button>
                        <div className={"mobile-signUp-block"}>
                            <p>Not a member?</p>
                            <Link to={"//social-network.samuraijs.com/signUp"} className={"mobile-signUp-button"}>Sign
                                up</Link>
                        </div>

                        {authError &&
                            <p className={"signIn-auth-error"}>{errorMessage}</p>}
                    </div>
                </div>
            </div>
        </form>

    )
}

export default SignIn

