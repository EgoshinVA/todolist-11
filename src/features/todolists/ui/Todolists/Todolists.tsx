import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import {todolistsSelectors} from "../../model/todolistsSelectors";

export const Todolists = () => {
    const todolists = useAppSelector(todolistsSelectors)

    return (
        <div>
            {todolists.map((tl) => {
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