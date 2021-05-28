import { Link } from "react-router-dom";

function UserStatus(props) {
    return (
        <div className="header__user-status">
            <span className="header__user-email"></span>
            <Link to={`/${props.linkUrl}`} target="_self" className="header__link">{props.linkName}</Link>
        </div>
    );
}

export default UserStatus;
