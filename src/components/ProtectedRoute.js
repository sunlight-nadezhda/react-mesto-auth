import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({
    component: Component,
    headerComponent: HeaderComponent,
    mainComponent: MainComponent,
    footerComponent: FooterComponent,
    ...props
}) {
    return (
        <Route>
            {() => {
                if (props.loggedIn) {
                    return (
                        <Component>
                            <HeaderComponent />
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
