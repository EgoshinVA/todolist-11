import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm";
import Container from "@mui/material/Container";
import {addTodolist} from "../features/todolists/model/todolistsSlice";
import {Todolists} from "../features/todolists/ui/Todolists/Todolists";
import {useAppDispatch} from "../common/hooks/useAppDispatch";
import {v1} from "uuid";

export const Main = () => {
    const dispatch = useAppDispatch()

    const addTodolistHandler = (title: string) => {
        dispatch(addTodolist({title, todolistId: v1()}))
    }

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