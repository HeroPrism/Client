import { RouteDiscriptor } from "./components/Routing/RouteCollection";
import { Home } from "./pages/Home/Home";
import { Profile } from "./pages/Profile/Profile";
import { Messages } from "./pages/Messages/Messages";
import { ChatPage } from "./pages/ChatPage/ChatPage";
import { RequestConversations } from "./pages/RequestConversations/RequestConversations";


export enum RouteName {
    Index,
    Profile,
    Chat,
    Messages,
    NotFound,
    RequestConversations
}

const ROUTING_TABLE: Record<RouteName, string> = {
    [RouteName.Index]: "/",
    [RouteName.RequestConversations]: "/requests/:id/conversations",
    [RouteName.Messages]: "/messages",
    [RouteName.Chat]: "/chat/:chatId",
    [RouteName.Profile]: "/profile",
    [RouteName.NotFound]: "/404"
};

export const routes: RouteDiscriptor[] = [
    { exact: true, path: ROUTING_TABLE[RouteName.Index], component: Home },
    { exact: true, path: ROUTING_TABLE[RouteName.Messages], component: Messages },
    { exact: true, path: ROUTING_TABLE[RouteName.RequestConversations], component: RequestConversations },
    { exact: true, path: ROUTING_TABLE[RouteName.Chat], component: ChatPage },
    { exact: true, path: ROUTING_TABLE[RouteName.Profile], component: Profile }
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
