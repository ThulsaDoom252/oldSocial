import React from 'react';
import {fetchUiBar, fetchUiSpin} from "../../redux/commonSlice";
import noAvatar from "../../common/avatarLoading.jpg"

const EmptyProfileTemplate = ({showMobileVersion}) => {
    return (

        <div className={"profile-main-container"}>
            <div className={"profile-page-left-part-container"}>
                <div className={"profile-page-left-part-userData"}>
                    <div>
                        <span className={"profile-page-left-part-label"}>Id</span>
                        {fetchUiBar}
                    </div>
                    <div
                        className={"profile-page-left-part-about-block"}>
                        <span className={"profile-page-left-part-label"}>Loading...</span>
                        {fetchUiBar}

                    </div>
                    {fetchUiBar}
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
                            <p className={"profile-page-userName"}>{fetchUiSpin}</p>
                            <div className="status-wrapper">
                                <div className="status-container">
                                    <p>{fetchUiSpin}</p>
                                </div>
                            </div>
                            <div className={"profile-page-left-contacts-block"}>
                                {fetchUiSpin}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={"user-data-block"}>
                            {fetchUiSpin}
                        </div>
                        <div className={"user-data-block"}>
                            {fetchUiSpin}
                        </div>
                        <div className={"user-data-block-about"}>
                            {fetchUiSpin}</div>
                    </div>
                </div>
                {<div style={{"display": showMobileVersion && "block"}} className={"mobile-friends-block"}>
                    <div className={"center-friends-block"}>
                    </div>
                </div>}
                <div className={"profile-page-center-wall"}>
                    <div className={"profile-page-navBar-container"}>
                        <span className={"profile-page-navBar-item"}>{fetchUiBar}</span>
                        <span className={"profile-page-navBar-item"}>{fetchUiBar}</span>
                        <span className={"profile-page-navBar-item"}>{fetchUiBar}</span>
                        <span className={"profile-page-navBar-item"}>{fetchUiBar}</span>
                    </div>
                    <div>
                        <div>
                            <div className={'profile-page-post-container'}>{fetchUiSpin}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"profile-page-right-part-container"}>
                <div className={"profile-page-right-part-photos-block"}>
                    <p className={"profile-page-right-part-photos-block-label"}></p>
                    {fetchUiSpin}
                </div>
                <div lassName={"profile-page-right-part-friends-block"}>
                    <p>{fetchUiBar}</p>
                    <div className={"profile-page-right-friend-block"}>{fetchUiSpin}</div>
                    <div className={"profile-page-right-friend-block"}>{fetchUiSpin}</div>
                    <div className={"profile-page-right-friend-block"}>{fetchUiSpin}</div>
                    <div className={"profile-page-right-friend-block"}>{fetchUiSpin}</div>
                </div>
            </div>
        </div>
    );
};

export default EmptyProfileTemplate;
