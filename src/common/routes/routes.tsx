import {createBrowserRouter} from "react-router";
import {App} from "../../app/App";
import {Main} from "../../app/Main";
import {Page404} from "../components/Page404/Page404";
import {Login} from "../../features/auth/ui/Login";

export const Path = {
    Main: '/',
    Page404: '/*',
    Login: '/login',
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: Path.Main,
                element: <Main/>
            },
            {
                path: Path.Page404,
                element: <Page404/>
            },
            {
                path: Path.Login,
                element: <Login/>
            },
        ]
    },
])