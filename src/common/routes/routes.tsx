import {createBrowserRouter} from "react-router";
import {App} from "../../app/App";
import {Main} from "../../app/Main";
import {Page404} from "../components/Page404/Page404";

export const Path = {
    Main: '/',
    Page404: '/*'
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
        ]
    },
])