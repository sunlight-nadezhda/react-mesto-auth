import React from "react";
import logo from "./../images/logo-white.svg";
import UserStatus from "./UserStatus";

function Header(props) {
    // const classNameButtonMenu = `button header__button-menu ${props.isMenuOpen ? '' : 'header__button-menu_opened'}`;
    // const classNameButtonClose = `button header__button-close ${props.isMenuOpen ? 'header__button-close_opened' : ''}`;
    return (
        <header className={`header ${props.isMenuOpen ? 'header_opened' : ''}`}>
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
                isMenuOpen={props.isMenuOpen}
            />
            <button
                type="button"
                aria-label="Меню открыть"
                // className={classNameButtonMenu}
                className="button header__button-menu"
                onClick={props.onShowMenu}
            ></button>
            <button
                type="button"
                aria-label="Закрыть"
                // className={classNameButtonClose}
                className="button header__button-close"
                onClick={props.onClose}
            ></button>
        </header>
    );
}

export default Header;
