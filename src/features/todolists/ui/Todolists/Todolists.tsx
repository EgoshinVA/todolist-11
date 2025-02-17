import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {useFetchTodolistsQuery} from '../../api/todolistsApi';
import {TodolistSkeleton} from "../skeletons/TodolistSkeleton/TodolistSkeleton";

export const Todolists = () => {
    const {data, isLoading} = useFetchTodolistsQuery()

    if(isLoading){
        return <>
            {Array(3).fill(null).map((_) => <TodolistSkeleton/>)}
        </>
    }

    return (
        <div style={{ display: 'flex' }}>
            {data?.map((tl) => {
                return (
                    <Grid key={tl.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                            <Todolist
                                key={tl.id}
                                todolist={tl}
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </div>
    )
}