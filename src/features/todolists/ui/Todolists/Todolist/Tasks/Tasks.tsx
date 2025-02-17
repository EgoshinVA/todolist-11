import React from 'react';
import List from "@mui/material/List";
import {Task} from "./Task/Task";
import {TaskStatus} from "../../../../../../common/enums/enums";
import {useFetchTasksQuery} from "../../../../api/tasksApi";
import {DomainTodolist} from "../../../../api/todolistsApi.types";
import {TasksSkeleton} from "../../../skeletons/TasksSkeleton/TasksSkeleton";

type Props = {
    todolist: DomainTodolist
}

export const Tasks = (props: Props) => {
    const {id, filter} = props.todolist

    const {data, isLoading} = useFetchTasksQuery(id)

    if (isLoading) {
        return <TasksSkeleton/>
    }

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