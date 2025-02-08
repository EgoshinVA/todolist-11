import React from 'react';
import {EditableSpan} from "../../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useRemoveTodolistMutation, useUpdateTodolistMutation} from "../../../../api/todolistsApi";
import {DomainTodolist} from "../../../../api/todolistsApi.types";

type Props = {
    todolist: DomainTodolist
}

export const TodolistTitle = (props: Props) => {
    const {title, id} = props.todolist

    const [removeTodolist] = useRemoveTodolistMutation()
    const [updateTodolistTitle] = useUpdateTodolistMutation()

    const updateTodolistHandler = (title: string) => {
        updateTodolistTitle({todolistId: id, title})
    }
    const removeTodolistHandler = () => {
        removeTodolist(id)
    }

    return (
        <div className={"todolist-title-container"}>
            <h3><EditableSpan value={title} onChange={updateTodolistHandler}/></h3>
            <IconButton onClick={removeTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}