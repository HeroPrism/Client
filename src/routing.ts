import { RouteDiscriptor } from "./components/Routing/RouteCollection";
import { Home } from "./pages/Home/Home";


export enum RouteName {
    Index,
    TaskDetails,
    NotFound
}

const ROUTING_TABLE: Record<RouteName, string> = {
    [RouteName.Index]: "/",
    [RouteName.TaskDetails]: "/help/:id",
    [RouteName.NotFound]: "/404"
};

export const routes: RouteDiscriptor[] = [
    { exact: true, path: ROUTING_TABLE[RouteName.Index], component: Home },
    { exact: true, path: ROUTING_TABLE[RouteName.TaskDetails], component: Home }
];

export const path = (name: RouteName, params?: any) => {
    if (!params) {
        return ROUTING_TABLE[name] || ROUTING_TABLE[RouteName.NotFound];
    }

    let path = ROUTING_TABLE[name];

    Object.keys(params).forEach(key => {
        path = path.replace(`:${key}`, params[key])
    });

    return path;
};
