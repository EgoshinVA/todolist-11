import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {AddItemForm} from "./AddItemForm";
import Container from "@mui/material/Container";
import {addTodolistAC} from "./model/todolists-reducer";
import {useDispatch} from "react-redux";
import {Todolists} from "./Todolists";

export const Main = () => {
    const dispatch = useDispatch()

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    return (
        <Container fixed>
            <Grid container sx={{mb: '30px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                <Todolists/>
            </Grid>
        </Container>
    );
};