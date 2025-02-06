import React, {ChangeEvent} from 'react';
import {getListItemSx} from "../../../../../../../Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {DomainTodolist} from "../../../../../model/todolistsSlice";
import {TaskType, UpdateTask} from "../../../../../api/tasksApi.types";
import {TaskStatus} from "../../../../../../../common/enums/enums";
import {useRemoveTaskMutation, useUpdateTaskMutation} from "../../../../../api/tasksApi";

type Props = {
    task: TaskType
    todolist: DomainTodolist
}

export const Task = ({todolist, task}: Props) => {
    const [removeTask] = useRemoveTaskMutation()
    const [updateTask] = useUpdateTaskMutation()

    const changeTask = (params: {title?: string, status?: TaskStatus}) => {
        const {title = task.title, status = task.status} = params;
        const newTask: UpdateTask = {
            title,
            status,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate
        }
        updateTask({taskId: task.id, task: newTask, todolistId: todolist.id})
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        changeTask({status})
    }

    const updateTaskHandler = (title: string) => {
        changeTask({title})
    }

    const removeTaskHandler = () => {
        removeTask({taskId: task.id, todolistId: todolist.id})
    }

    return (
        <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
            <div>
                <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatusHandler}/>
                <EditableSpan value={task.title} onChange={updateTaskHandler}/>
            </div>
            <IconButton onClick={removeTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}