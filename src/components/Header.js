import React from "react";
import logo from './../images/logo-white.svg';

function Header() {
    return (
        <header className="header">
            <a href="index.html" target="_self" className="logo">
                <img
                    src={logo}
                    alt="Логотип проекта Место"
                    className="header__logo"
                />
            </a>
        </header>
    );
}

export default Header;
