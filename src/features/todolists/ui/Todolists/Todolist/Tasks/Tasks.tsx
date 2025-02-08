import React from 'react';
import List from "@mui/material/List";
import {Task} from "./Task/Task";
import {TaskStatus} from "../../../../../../common/enums/enums";
import {useFetchTasksQuery} from "../../../../api/tasksApi";
import {DomainTodolist} from "../../../../api/todolistsApi.types";

type Props = {
    todolist: DomainTodolist
}

export const Tasks = (props: Props) => {
    const {id, filter} = props.todolist

    const {data} = useFetchTasksQuery(id)

    let tasksForTodolist = data?.items

    if (filter === 'active') {
        tasksForTodolist = tasksForTodolist?.filter(task => task.status === TaskStatus.New)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasksForTodolist?.filter(task => task.status === TaskStatus.Completed)
    }

    return (
        <>
            {tasksForTodolist?.length === 0 ?
                <p>Тасок нет</p> :
                <List>
                    {tasksForTodolist?.map(task => <Task key={task.id} task={task} todolist={props.todolist}/>)}
                </List>
            }
        </>
    )
}