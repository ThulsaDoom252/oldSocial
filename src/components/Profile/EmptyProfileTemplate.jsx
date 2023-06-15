import React from 'react';
import noAvatar from "../../common/avatarLoading.jpg"

const EmptyProfileTemplate = ({showMobileVersion}) => {
    const loadingAnimation = {
        height: "25px",
        background: 'linear-gradient(400deg, #ffdddd, #23211e, #fae5bb, #fce4cb)',
        backgroundSize: '200% 100%',
        animation: "loading 1s infinite"
    }

    const marginTopStyle = {marginTop: "15px"}

    return (
        <div className={"profile-main-container"}>
            <div className={"profile-page-left-part-container"}>
                <div className={"profile-page-left-part-userData"}>
                    <div>
                        <span className={"profile-page-left-part-label"}></span>
                    </div>
                    <div
                        style={loadingAnimation}
                        className={"profile-page-left-part-about-block"}>
                        <span className={"profile-page-left-part-label"}></span>
                    </div>
                </div>
            </div>
            <div className={"profile-page-center-container"}>
                <div className={"profile-page-center-bg"}></div>
                <div className={"profile-page-center-userInfo-container"}>
                    <div className="profile-page-center-avatarBlockContainer">
                        <div>
                            <img className="profile-page-avatar"
                                 src={noAvatar}
                                 alt="loading..."/>
                            <p className={"profile-page-userName"} style={loadingAnimation}></p>
                            <div className="status-wrapper">
                                <div style={loadingAnimation} className="status-container">
                                </div>
                            </div>
                            <div className={"profile-page-left-contacts-block"}>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={loadingAnimation} className={"user-data-block"}>
                        </div>
                        <div style={loadingAnimation} className={"user-data-block"}>
                        </div>
                        <div className={"user-data-block-about"} style={loadingAnimation}></div>
                    </div>
                </div>
                {<div style={{"display": showMobileVersion && "block", ...loadingAnimation}}
                      className={"mobile-friends-block"}>
                    <div className={"center-friends-block"}>
                    </div>
                </div>}
                <div className={"profile-page-center-wall"}>
                    <div className={"profile-page-navBar-container"}>
                        <span style={loadingAnimation} className={"profile-page-navBar-item"}></span>
                        <span style={loadingAnimation} className={"profile-page-navBar-item"}></span>
                        <span style={loadingAnimation} className={"profile-page-navBar-item"}></span>
                        <span style={loadingAnimation} className={"profile-page-navBar-item"}></span>
                    </div>
                    <div>
                        <div>
                            <div style={loadingAnimation} className={'profile-page-post-container'}></div>
                            <div style={loadingAnimation} className={'profile-page-post-container'}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"profile-page-right-part-container"}>
                <div className={"profile-page-right-part-photos-block"}>
                    <p className={"profile-page-right-part-photos-block-label"}></p>
                    <div style={{...marginTopStyle,...loadingAnimation}}></div>
                    <div style={{...marginTopStyle,...loadingAnimation}}></div>
                    <div style={{...marginTopStyle,...loadingAnimation}}></div>
                    <div style={{...marginTopStyle,...loadingAnimation}}></div>
                </div>
                <div className={"profile-page-right-part-friends-block"}>
                    <div style={{...marginTopStyle, ...loadingAnimation}}
                         className={"profile-page-right-part-friend-block"}></div>
                    <div style={{...marginTopStyle, ...loadingAnimation}}
                         className={"profile-page-right-part-friend-block"}></div>
                    <div style={{...marginTopStyle, ...loadingAnimation}}
                         className={"profile-page-right-part-friend-block"}></div>
                    <div style={{...marginTopStyle, ...loadingAnimation}}
                         className={"profile-page-right-part-friend-block"}></div>
                    <div style={{...marginTopStyle, ...loadingAnimation}}
                         className={"profile-page-right-part-friend-block"}></div>
                </div>
            </div>
        </div>
    );
};

export default EmptyProfileTemplate;
