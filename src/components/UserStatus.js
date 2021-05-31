import { Link } from "react-router-dom";

function UserStatus(props) {
    return (
        // <div className={`header__user-status ${props.isMenuOpen ? 'header__user-status_opened' : ''}`}>
        <div className={`header__user-status ${props.isMenuOpen ? 'header__user-status_opened' : ''}`}>
            <span className="header__user-email">{props.userData ? props.userData.email : ""}</span>
            <Link
                to={`/${props.linkUrl}`}
                target="_self"
                className={`header__link ${props.classLink ? props.classLink : ''}`}
                onClick={props.onSignOut}
            >
                {props.linkName}
            </Link>
        </div>
    );
}

export default UserStatus;