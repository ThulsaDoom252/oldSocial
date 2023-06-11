import React, {useEffect} from "react";
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Settings from "./components/Settings/Settings";
import News from "./components/News";
import Login from "./components/Auth/Login";
import {useDispatch, useSelector} from "react-redux";
import Initialize from "./components/Initialize";
import {initializeTC} from "./redux/appSlice";
import NotFound from "./components/common/NotFound";
import Users from "./components/Users/Users";
import DialogsContainer from "./components/Messages/DialoigsContainer";
import Overlay from "./components/Overlay/Overlay";
import Friends from "./components/Friends";
import Photos from "./components/Gallery";
import {nightModeStyles} from "./common/nightModeStyles";
import HeaderContainer from "./components/Header/HeaderContainer";
import ProfileRelay from "./components/Profile/ProfileRelay";
import EditProfileDataRelay from "./components/EditProfile/EditProfileDataRelay";

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
        return <Initialize/>

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
                                <Route path={"/profile/:userId"} element={<ProfileRelay/>}/>
                                <Route path="/messages" element={<DialogsContainer nightMode={nightMode}/>}/>
                                <Route path="/gallery" element={<Photos nightMode={nightMode}/>}/>
                                <Route path="" element={<Login/>}/>
                                <Route path="/users" element={<Users nightMode={nightMode}/>}/>
                                <Route path="/news" element={<News/>}/>
                                <Route path="/edit" element={<EditProfileDataRelay/>}/>
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
