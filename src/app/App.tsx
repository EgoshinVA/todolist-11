import './App.css';
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from '@mui/material/styles';
import React, {useEffect, useState} from "react";
import {getTheme} from "../common/theme/theme";
import {Header} from "../common/components/Header/Header";
import {useAppSelector} from "../common/hooks/useAppSelector";
import {selectThemeMode, setIsAuth} from "./appSlice";
import {Outlet} from "react-router";
import {useAppDispatch} from "../common/hooks/useAppDispatch";
import {CircularProgress} from "@mui/material";
import {useAuthMeQuery} from "../features/auth/api/authApi";
import {ResultCode} from "../common/enums/enums";

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)
    const dispatch = useAppDispatch()

    const [isInitialized, setIsInitialized] = useState<boolean>(false)

    const {data, isLoading} = useAuthMeQuery()

    useEffect(() => {
        if (!isLoading){
            setIsInitialized(true)
            if (data?.resultCode === ResultCode.Success)
                dispatch(setIsAuth(true))
        }
    }, [data, isLoading])

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
