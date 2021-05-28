import React from "react";
import logo from './../images/logo-white.svg';
import UserStatus from "./UserStatus";

function Header(props) {
    return (
        <header className="header">
            <a href="index.html" target="_self" className="logo">
                <img
                    src={logo}
                    alt="Логотип проекта Место"
                    className="header__logo"
                />
            </a>
            <UserStatus linkUrl={props.linkUrl} linkName={props.linkName} />
        </header>
    );
}

export default Header;
