import React, { useEffect } from "react";

function Login(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isDisabled, setIsDisabled] = React.useState(true);
    const submitButtonClassName = `popup__save-button popup__save-button_type_${props.name} ${
        isDisabled ? "popup__save-button_inactive" : ""
    }`;

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onLogin({ email, password });
        setEmail("");
        setPassword("");
    }

    useEffect(() => {
      setEmail("");
      setPassword("");
    }, []);

    useEffect(() => {
        if (email === "" || password === "") {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [email, password]);

    return (
        <div className={`popup__container popup__container_type_${props.name}`}>
            <h2 className={`popup__title popup__title_type_${props.name}`}>{props.title}</h2>
            <form
                className={`popup__form popup__form_type_${props.name}`}
                name={props.name}
                noValidate
                onSubmit={handleSubmit}
            >
                <label className="popup__form-field">
                    <input
                        type="email"
                        value={email}
                        onChange={handleChangeEmail}
                        name={`input-name-${props.name}`}
                        placeholder="Email"
                        className={`popup__input popup__input_type_${props.name} popup__input_type_email-${props.name}`}
                        id={`input-email-${props.name}`}
                        required
                    />
                    <span className={`popup__input-error input-email-${props.name}-error`}></span>
                </label>
                <label className="popup__form-field">
                    <input
                        type="password"
                        value={password}
                        onChange={handleChangePassword}
                        name={`input-password-${props.name}`}
                        placeholder="Пароль"
                        className={`popup__input popup__input_type_${props.name} popup__input_type_password-${props.name}`}
                        id={`input-password-${props.name}`}
                        required
                    />
                    <span className={`popup__input-error input-password-${props.name}-error`}></span>
                </label>
                <button
                    type="submit"
                    className={submitButtonClassName}
                    disabled={isDisabled}
                >
                    {props.buttonText}
                </button>
            </form>
        </div>
    );
}

export default Login;
