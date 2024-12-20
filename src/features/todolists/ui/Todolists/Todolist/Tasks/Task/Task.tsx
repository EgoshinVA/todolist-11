import React, {ChangeEvent} from 'react';
import {getListItemSx} from "../../../../../../../Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../../../../../../common/components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {TaskType, TodolistType} from "../../../../../../../app/App";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../../../../../../model/tasks-reducer";
import {useAppDispatch} from "../../../../../../../common/hooks/useAppDispatch";

type Props = {
    task: TaskType
    todolist: TodolistType
}

export const Task = ({todolist, task}: Props) => {
    const dispatch = useAppDispatch();

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC({taskId: task.id, isDone: e.currentTarget.checked, todolistId: todolist.id}))
    }

    const updateTask = (title: string) => {
        dispatch(changeTaskTitleAC({taskId: task.id, title, todolistId: todolist.id}))
    }

    const removeTask = () => {
        dispatch(removeTaskAC({taskId: task.id, todolistId: todolist.id}))
    }

    return (
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatus}/>
                <EditableSpan value={task.title} onChange={updateTask}/>
            </div>
            <IconButton onClick={removeTask}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}