import React from "react";
import AppBar from "@mui/material/AppBar";
import {getTheme} from "../../theme/theme";
import {changeTheme} from "../../../app/appSlice";
import {MenuButton} from "../MenuButton/MenuButton";
import Switch from "@mui/material/Switch";
import Toolbar from "@mui/material/Toolbar";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import {Link} from "react-router";
import {Path} from "../../routes/routes";
import Button from "@mui/material/Button";
import {logout} from "../../../features/auth/model/authSlice";

export const Header = () => {
    const themeMode = useAppSelector(state => state.app.themeMode)

    const dispatch = useAppDispatch()

    const theme = getTheme(themeMode)

    const changeModeHandler = () => {
        dispatch(changeTheme(themeMode === 'light' ? 'dark' : 'light'))
    }

    return (
        <AppBar position="static" sx={{mb: '30px'}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Link to={Path.Main}>
                    <Button variant="text" color={'inherit'}>Todolists</Button>
                </Link>
                <div>
                    <MenuButton onClick={() => dispatch(logout())}>Logout</MenuButton>
                    <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                    <Switch color={'default'} onChange={changeModeHandler}/>
                </div>
            </Toolbar>
        </AppBar>
    )
}