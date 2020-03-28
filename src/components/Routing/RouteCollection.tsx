import React, { FunctionComponent, ComponentType } from "react";
import { Route } from "react-router-dom";

export interface RouteDiscriptor {
    exact: boolean;
    path: string | string[];
    component: ComponentType<any>;
}

interface RouteCollectionProps {
    routes: RouteDiscriptor[];
}

const key = (value: string | string[]): string => {
    if (typeof value == "string") {
        return value;
    }

    return value.join(":");
};

export const RouteCollection: FunctionComponent<RouteCollectionProps> = (props) => {
    return (
        <>
            {props.routes.map((route) => (
                <Route key={key(route.path)} exact={route.exact} path={route.path} component={route.component} />
            ))}
        </>
    );
};
