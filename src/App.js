import React, {useEffect} from "react";
import './App.css';
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Settings from "./components/Settings/Settings";
import News from "./components/News";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import Initialize from "./components/Initialize";
import {initializeTC} from "./redux/appSlice";
import NotFound from "./components/common/NotFound";
import Users from "./components/Users/Users";
import Messages from "./components/Messages/Messages";
import Overlay from "./components/Overlay/Overlay";
import Friends from "./components/Friends";
import EditProfileData from "./components/Profile/ProfileCenterPart/EditProfile/EditProfileData";
import Photos from "./components/Gallery";
import {nightModeStyles} from "./common/nightModeStyles";

function App(props) {
    const {nightMode, showMobileVersion} = props
    const navbar = document.querySelectorAll("header-navbar")
    useEffect(() => {
        if (nightMode) {
            document.body.style = "background: linear-gradient(360deg, black, #2a2828, #121a34, #252a2d)"

        } else {
            document.body.style = "background: linear-gradient(180deg, #5ee7c1, #00e8a5, #35cbff, #5ee7c1)"
        }
    }, [nightMode])

    useEffect(() => {
        props.initializeTC()
        console.log('once')
    }, [])

    if (!props.initialized) {
        return (
            <div className={"container"}>
                <Initialize/>
            </div>
        )

    } else {
        return (
            <BrowserRouter>
                <div>
                    {props.overlayVisible && <Overlay/>}
                    <div style={{"width": showMobileVersion &&  "800px"}} className={props.auth && "wrapper"}>
                        <section style={nightMode ? nightModeStyles.section : null}
                                 className={props.auth && "section-content"}>
                            <Header/>
                            <Routes>
                                <Route path={"/profile/:userId"} element={<Profile
                                    nightMode={nightMode}
                                    overlay={props.overlayVisible}
                                    showOverlay={props.showOverlayAC}/>}/>
                                <Route path="/messages" element={<Messages nightMode={nightMode}/>}/>
                                <Route path="/gallery" element={<Photos nightMode={nightMode}/>}/>
                                <Route path="" element={<Login/>}/>
                                <Route path="/users" element={<Users nightMode={nightMode}/>}/>
                                <Route path="/news" element={<News/>}/>
                                <Route path="/edit" element={<EditProfileData/>}/>
                                <Route path="/settings" element={<Settings nightMode={nightMode}/>}/>
                                <Route path={"/friends"} element={<Friends nightMode={nightMode}/>}/>
                                <Route path="*" element={<NotFound/>}/>
                                <Route path="/profile/*" element={<NotFound/>}/>
                            </Routes>
                        </section>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized,
        auth: state.auth.isLogged,
        overlayVisible: state.profilePage.showOverlay,
        nightMode: state.settings.nightMode,
        showMobileVersion: state.settings.showMobileVersion,
    }
}

export default connect(mapStateToProps, {initializeTC})(App);
