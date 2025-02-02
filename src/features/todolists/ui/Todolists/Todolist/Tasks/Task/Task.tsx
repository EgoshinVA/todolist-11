import React, {ChangeEvent} from 'react';
import {getListItemSx} from "../../../../../../../Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {TaskType} from "../../../../../../../app/App";
import {useAppDispatch} from "../../../../../../../common/hooks/useAppDispatch";
import {changeTaskStatus, changeTaskTitle, removeTask} from "../../../../../model/tasksSlice";
import {DomainTodolist} from "../../../../../model/todolistsSlice";

type Props = {
    task: TaskType
    todolist: DomainTodolist
}

export const Task = ({todolist, task}: Props) => {
    const dispatch = useAppDispatch();

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatus({taskId: task.id, isDone: e.currentTarget.checked, todolistId: todolist.id}))
    }

    const updateTaskHandler = (title: string) => {
        dispatch(changeTaskTitle({taskId: task.id, title, todolistId: todolist.id}))
    }

    const removeTaskHandler = () => {
        dispatch(removeTask({taskId: task.id, todolistId: todolist.id}))
    }

    return (
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan value={task.title} onChange={updateTaskHandler}/>
            </div>
            <IconButton onClick={removeTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}