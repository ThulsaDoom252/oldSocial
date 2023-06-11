import React, {useEffect} from "react";
import './App.css';
import Profile from "./components/Profile/ProfileContainer";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Settings from "./components/Settings/Settings";
import News from "./components/News";
import Login from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
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
import {showOverlayAC} from "./redux/profile/profileSlice";
import HeaderContainer from "./components/Header/HeaderContainer";

const App = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth.isLogged)
    const overlayVisible = useSelector(state => state.profilePage.showOverlay)
    const initialized = useSelector(state => state.app.initialized)
    const nightMode = useSelector(state => state.settings.nightMode)
    const showMobileVersion = useSelector(state => state.settings.showMobileVersion)


    useEffect(() => {
        if (nightMode) {
            document.body.style = "background: linear-gradient(360deg, black, #2a2828, #121a34, #252a2d)"

        } else {
            document.body.style = "background: linear-gradient(180deg, #5ee7c1, #00e8a5, #35cbff, #5ee7c1)"
        }
    }, [nightMode])

    useEffect(() => {
        dispatch(initializeTC())
    }, [])

    if (!initialized) {
        return (
            <div className={"container"}>
                <Initialize/>
            </div>
        )

    } else {
        return (
            <BrowserRouter>
                <div>
                    {overlayVisible && <Overlay {...{dispatch}}/>}
                    <div style={{"width": showMobileVersion && "800px"}} className={auth && "wrapper"}>
                        <section style={nightMode ? nightModeStyles.section : null}
                                 className={auth && "section-content"}>
                            <HeaderContainer {...{dispatch}}/>
                            <Routes>
                                <Route path={"/profile/:userId"} element={<Profile
                                    nightMode={nightMode}
                                    overlay={overlayVisible}
                                    showOverlay={showOverlayAC}/>}/>
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


export default App;
