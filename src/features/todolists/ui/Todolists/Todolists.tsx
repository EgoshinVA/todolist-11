import React, {useEffect} from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import {fetchTodolists, selectTodolists} from "../../model/todolistsSlice";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTodolists())
    }, []);

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