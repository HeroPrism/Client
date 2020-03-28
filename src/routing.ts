import { RouteDiscriptor } from "./components/Routing/RouteCollection";
import { Home } from "./pages/Home/Home";


export enum RouteName {
    Index,
    NotFound
}

const ROUTING_TABLE: Record<RouteName, string> = {
    [RouteName.Index]: "/",
    [RouteName.NotFound]: "/404"
};

export const routes: RouteDiscriptor[] = [
    { exact: true, path: ROUTING_TABLE[RouteName.Index], component: Home }
];

export const path = (name: RouteName) => {
    return ROUTING_TABLE[name] || ROUTING_TABLE[RouteName.NotFound];
};
