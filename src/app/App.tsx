import './App.css';
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from '@mui/material/styles';
import React from "react";
import {getTheme} from "../common/theme/theme";
import {Header} from "../common/components/Header/Header";
import {useAppSelector} from "../common/hooks/useAppSelector";
import {selectThemeMode} from "./appSlice";
import {Outlet} from "react-router";

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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header/>
            <Outlet/>
        </ThemeProvider>
    );
}
