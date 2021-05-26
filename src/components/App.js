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
import ProtectedRoute from "./ProtectedRoute";

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

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsConfirmationPopupOpen(false);
        setSelectedCard({});
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
                <div className="page__content">
                    <Header />
                    <Switch>
                        <Route path="/main">
                            {!loggedIn ? (
                                <Redirect to="/signin" />
                            ) : (
                                <Main
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onEditAvatar={handleEditAvatarClick}
                                    onShowImage={handleCardClick}
                                    cards={cards}
                                    onCardLike={handleCardLike}
                                    onConfirm={handleConfirmationClick}
                                />
                            )}
                        </Route>
                        <Route path="/signin">
                            <Login
                                title="Вход"
                                name="login"
                                buttonText="Войти"
                            ></Login>
                        </Route>
                        <Route path="/signup"></Route>
                        <ProtectedRoute
                            path="/main"
                            loggedIn={loggedIn}
                            component={Main}
                        />
                        <Route>
                            {loggedIn ? (
                                <Redirect to="/main" />
                            ) : (
                                <Redirect to="./signin" />
                            )}
                        </Route>
                    </Switch>
                    <Footer />
                </div>

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
