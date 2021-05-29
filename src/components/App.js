import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import api from "./../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import PageContent from "./PageContent";
import { registerStatus } from "../utils/constants";
import auth from "./../utils/auth";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState(null);
    const [cards, setCards] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] =
        useState(false);
    const [deletedCard, setDeletedCard] = useState({});
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    // const [userData, setUserData] = useState(null);
    const [statusData, setStatusData] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleConfirmationClick(cardData) {
        setIsConfirmationPopupOpen(true);
        setDeletedCard(cardData);
    }

    function handleInfoTooltipSubmit(userData) {
        // setUserData(userData);
        // console.log(userData);
        auth.register(userData)
            .then((response) => {
                if (response.ok) {
                    setStatusData(registerStatus.success);
                    setIsInfoTooltipOpen(true);
                    return response.json();
                } else {
                    setStatusData(registerStatus.fail);
                    setIsInfoTooltipOpen(true);
                    return Promise.reject(`Ошибка: ${response.status}`);
                }
            })
            .catch((err) => console.log(err));
    }

    function handleLoginSubmit(userData) {
        // setUserData(userData);
        // console.log(userData);
        auth.authorize(userData)
            .then((response) =>
                response.ok
                    ? response.json()
                    : Promise.reject(`Ошибка: ${response.status}`)
            )
            .then((data) => localStorage.setItem('token', data.token))
            .catch((err) => console.log(err));
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsConfirmationPopupOpen(false);
        setSelectedCard({});
        setIsInfoTooltipOpen(false);
        setStatusData(null);
    }

    function handleCardClick(cardData) {
        setSelectedCard(cardData);
    }

    function handleUpdateUser(data) {
        setIsLoading(true);
        api.setUserInfo(data)
            .then((userData) => {
                setIsLoading(false);
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(obj) {
        setIsLoading(true);
        api.setUserAvatar(obj.avatar)
            .then((userData) => {
                setIsLoading(false);
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardLike(card) {
        const cardLikes = card.likes;
        const isLiked = cardLikes.some((item) => item._id === currentUser._id);
        if (!isLiked) {
            cardLikes.push(currentUser);
        }

        api.changeLikeCardStatus(card._id, !isLiked, cardLikes)
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then((cardData) => {
                setCards((state) => state.filter((c) => c._id !== card._id));
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit(place) {
        setIsLoading(true);
        api.addCard(place)
            .then((newCard) => {
                setIsLoading(false);
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    React.useEffect(() => {
        api.getUserInfo()
            .then((userInfo) => {
                setCurrentUser(userInfo);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    React.useEffect(() => {
        api.getInitialCards()
            .then((initialCards) => {
                setCards(initialCards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    React.useEffect(() => {
        function onCloseByEsc(event) {
            if (event.key === "Escape") {
                closeAllPopups();
            }
        }

        document.addEventListener("keydown", onCloseByEsc);
        return () => {
            document.removeEventListener("keydown", onCloseByEsc);
        };
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Switch>
                    <ProtectedRoute
                        exact
                        path="/"
                        loggedIn={loggedIn}
                        // loggedIn={true}
                        component={PageContent}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onShowImage={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onConfirm={handleConfirmationClick}
                        headerComponent={Header}
                        mainComponent={Main}
                        footerComponent={Footer}
                    />
                    <Route path="/signin">
                        <PageContent>
                            <Header linkUrl="signup" linkName="Регистрация" />
                            <Login
                                title="Вход"
                                name="login"
                                buttonText="Войти"
                                onLoginSubmit={handleLoginSubmit}
                            />
                        </PageContent>
                    </Route>
                    <Route path="/signup">
                        <PageContent>
                            <Header linkUrl="signin" linkName="Войти" />
                            <Register
                                title="Регистрация"
                                name="register"
                                buttonText="Зарегистрироваться"
                                onRegisterSubmit={handleInfoTooltipSubmit}
                            />
                        </PageContent>
                    </Route>
                    <Route>
                        {!loggedIn ? (
                            <Redirect to="signin" />
                        ) : (
                            <Redirect to="/" />
                        )}
                    </Route>
                </Switch>

                <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    statusData={statusData}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    buttonText={isLoading ? "Сохранение..." : "Сохранить"}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    buttonText={isLoading ? "Сохранение..." : "Создать"}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    buttonText={isLoading ? "Сохранение..." : "Создать"}
                />

                <ConfirmationPopup
                    isOpen={isConfirmationPopupOpen}
                    onClose={closeAllPopups}
                    onCardDelete={handleCardDelete}
                    card={deletedCard}
                    buttonText="Да"
                />

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
