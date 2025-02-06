import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {useFetchTodolistsQuery} from '../../api/todolistsApi';

export const Todolists = () => {
    const {data} = useFetchTodolistsQuery()

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