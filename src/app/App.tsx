import './App.css';
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from '@mui/material/styles';
import React, {useEffect} from "react";
import {getTheme} from "../common/theme/theme";
import {Header} from "../common/components/Header/Header";
import {useAppSelector} from "../common/hooks/useAppSelector";
import {selectThemeMode} from "./appSlice";
import {Outlet} from "react-router";
import {useAppDispatch} from "../common/hooks/useAppDispatch";
import {authMe, selectIsInitialized} from "../features/auth/model/authSlice";
import {CircularProgress} from "@mui/material";

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(selectIsInitialized)

    useEffect(() => {
        dispatch(authMe())
    }, [])

    if (!isInitialized)
        return <div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress size={150}/></div>

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header/>
            <Outlet/>
        </ThemeProvider>
    );
}
