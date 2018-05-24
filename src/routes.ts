import {home, postSaveAction} from "./controller/PostSaveAction";

/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: "/",
        method: "get",
        action: home
    },
    {
        path: "/posts",
        method: "post",
        action: postSaveAction
    }
];