import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({
    component: Component,
    headerComponent: HeaderComponent,
    mainComponent: MainComponent,
    footerComponent: FooterComponent,
    userData,
    linkUrl,
    linkName,
    classLink,
    onSignOut,
    ...props
}) {
    return (
        <Route>
            {() => {
                if (props.loggedIn) {
                    return (
                        <Component>
                            <HeaderComponent
                                userData={userData}
                                linkUrl={linkUrl}
                                linkName={linkName}
                                classLink={classLink}
                                onSignOut={onSignOut}
                            />
                            <MainComponent {...props} />
                            <FooterComponent />
                        </Component>
                    );
                } else {
                    return <Redirect to="./signin" />;
                }
            }}
        </Route>
    );
}

export default ProtectedRoute;
