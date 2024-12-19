import './App.css';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Unstable_Grid2';
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AddItemForm} from "../AddItemForm";
import {RootState} from "./store";
import {MenuButton} from "../MenuButton";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../model/tasks-reducer";
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC
} from "../model/todolists-reducer";
import {Todolist} from "../Todolist";
import {getTheme} from "../common/theme/theme";
import {changeThemeAC} from "./app-reducer";
import {Header} from "../Header";
import { Main } from '../Main';

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

type ThemeMode = 'dark' | 'light'

export const App = () => {
	const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode)
	const theme = getTheme(themeMode)
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<Header/>
			<Main/>
		</ThemeProvider>
	);
}