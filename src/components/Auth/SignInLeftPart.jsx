import React from "react";

const SignInLeftPart = ({showSignInBlock, signButtonDisabled, handleDisableSignInButton}) => {
    return (
        <div className={"login-left-part-container"}>
            <div className={"login-page-left-part"}>
                <div className={"slogan-block"}>
                    <p>React Samurai's</p>
                    <p>Social Network</p>
                </div>
                <hr className={"slogan-line"}/>
                <div className={"left-part-content"}>
                    <p className={"content-first-line"}>We are</p>
                    <h1 className={"content-second-line"}>Community of react-developers from
                        all over the world</h1>
                    <p>Exceed yourself</p>
                    <p className={"left-part-last-line"}>Make it right. Make it fast. Make it
                        work &copy;</p>
                </div>
                <div className={"left-part-signUp-block"}>
                    <p>{showSignInBlock ? "Not a member?" : "Already have an account?"}</p>
                    <button
                        disabled={signButtonDisabled}
                        onClick={handleDisableSignInButton}
                        className={"left-part-sign-btn"}>{showSignInBlock ? "Sign Up" : "Sign In"}
                    </button>
                </div>
            </div>
        </div>

    )
}

export default SignInLeftPart



