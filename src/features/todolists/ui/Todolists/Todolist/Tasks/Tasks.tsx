import React, {useEffect} from 'react';
import List from "@mui/material/List";
import {Task} from "./Task/Task";
import {useAppSelector} from "../../../../../../common/hooks/useAppSelector";
import {fetchTasks, selectTasks} from "../../../../model/tasksSlice";
import {DomainTodolist} from "../../../../model/todolistsSlice";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";
import {TaskStatus} from "../../../../../../common/enums/enums";

type Props = {
    todolist: DomainTodolist
}

export const Tasks = (props: Props) => {
    const {id, filter} = props.todolist

    const tasks = useAppSelector(selectTasks);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTasks(id))
    }, []);

    const allTodolistTasks = tasks[id] || []
    let tasksForTodolist = allTodolistTasks

    if (filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter(task => task.status === TaskStatus.New)
    }

    if (filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(task => task.status === TaskStatus.Completed)
    }

    return (
        <>
            {tasksForTodolist.length === 0 ?
                <p>Тасок нет</p> :
                <List>
                    {tasksForTodolist?.map(task => <Task key={task.id} task={task} todolist={props.todolist}/>)}
                </List>
            }</>

    )
}