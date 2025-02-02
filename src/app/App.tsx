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
import {authMe} from "../features/auth/model/authSlice";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(authMe())
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header/>
            <Outlet/>
        </ThemeProvider>
    );
}
