import React from 'react';
import List from "@mui/material/List";
import {TodolistType} from "../../../../../../app/App";
import {Task} from "./Task/Task";
import {useAppSelector} from "../../../../../../common/hooks/useAppSelector";
import {tasksSelectors} from "../../../../model/tasksSelectors";

type Props = {
    todolist: TodolistType
}

export const Tasks = (props: Props) => {
    const {id, filter} = props.todolist

    const tasks = useAppSelector(tasksSelectors);

    const allTodolistTasks = tasks[id]
    let tasksForTodolist = allTodolistTasks

    if (filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
    }

    if (filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
    }

    return (
        <>
            {tasksForTodolist.length === 0
                ? <p>Тасок нет</p>
                : <List>
                    {tasksForTodolist.map(task => <Task task={task} todolist={props.todolist}/>)}
                </List>
            }</>

    )
}