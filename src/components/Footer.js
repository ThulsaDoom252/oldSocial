import React from 'react';
import {BsFacebook, BsInstagram, BsTelegram} from "react-icons/bs";
import {connect} from "react-redux";

const openUrl = (url) => {
    window.open(url, "_blank");
}

const Footer = (props) => (
    <div hidden={props.footerHidden}>
        <div  className={"footer"}>
            <div className={"footer-container"}>
                <BsInstagram
                    className={"footer-instagram-icon"}
                    onClick={() => {
                        openUrl("https://www.instagram.com/t_h_u_l_s_a_d_o_o_m/")
                    }}/>
                <BsFacebook
                    className={"footer-facebook-icon"}
                    onClick={() => {
                        openUrl("https://www.facebook.com/xenolm252")
                    }}/>
                <BsTelegram className={"footer-telegram-icon"}
                            onClick={() => {
                                openUrl("https://t.me/ThulsaDoom92")
                            }}/>
            </div>
        </div>
    </div>

)

const mapStateToProps = (state) => {
    return {
        footerHidden: state.app.footerHidden
    }
}

export default connect(mapStateToProps)(Footer);