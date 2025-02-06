import React, {useEffect} from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm";
import Container from "@mui/material/Container";
import {Todolists} from "../features/todolists/ui/Todolists/Todolists";
import {useAppSelector} from "../common/hooks/useAppSelector";
import {useNavigate} from "react-router";
import {useAddTodolistMutation} from "../features/todolists/api/todolistsApi";
import {selectIsAuth} from "./appSlice";

export const Main = () => {
    const [addTodolist] = useAddTodolistMutation()

    const addTodolistHandler = (title: string) => {
        addTodolist(title)
    }

    const isAuth = useAppSelector(selectIsAuth)
    const navigate = useNavigate();

    useEffect(() => {
        !isAuth && navigate('/login')
    }, [isAuth])

    return (
        <Container fixed>
            <Grid container sx={{mb: '30px'}}>
                <AddItemForm addItem={addTodolistHandler}/>
            </Grid>
            <Grid container spacing={4}>
                <Todolists/>
            </Grid>
        </Container>
    );
};