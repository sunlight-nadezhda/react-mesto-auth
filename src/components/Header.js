import React from "react";
import logo from "./../images/logo-white.svg";
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
            <UserStatus
                userData={props.userData}
                linkUrl={props.linkUrl}
                linkName={props.linkName}
                classLink={props.classLink}
                onSignOut={props.onSignOut}
            />
        </header>
    );
}

export default Header;
