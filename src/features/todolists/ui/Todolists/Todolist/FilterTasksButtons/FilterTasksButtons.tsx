import React from 'react';
import {filterButtonsContainerSx} from "../../../../../../Todolist.styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {DomainTodolist, FilterValuesType} from "../../../../api/todolistsApi.types";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";
import {todolistApi} from "../../../../api/todolistsApi";

type Props = {
    todolist: DomainTodolist
}

export const FilterTasksButtons = (props: Props) => {
    const {id, filter} = props.todolist

    const dispatch = useAppDispatch();

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        dispatch(todolistApi.util.updateQueryData('fetchTodolists', undefined, state => {
            const todolist = state.find(tl => tl.id === id)
            if (todolist)
                todolist.filter = filter
        }))
    }

    return (
        <Box sx={filterButtonsContainerSx}>
            <Button
                variant={filter === 'all' ? 'outlined' : 'text'}
                color={'inherit'}
                onClick={() => changeFilterTasksHandler('all')}>
                All
            </Button>
            <Button
                variant={filter === 'active' ? 'outlined' : 'text'}
                color={'primary'}
                onClick={() => changeFilterTasksHandler('active')}>
                Active
            </Button>
            <Button
                variant={filter === 'completed' ? 'outlined' : 'text'}
                color={'secondary'}
                onClick={() => changeFilterTasksHandler('completed')}>
                Completed
            </Button>
        </Box>
    )
}