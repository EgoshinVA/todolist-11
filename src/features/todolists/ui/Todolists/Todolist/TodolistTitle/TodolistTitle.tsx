import React from 'react';
import {EditableSpan} from "../../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {todolistApi, useRemoveTodolistMutation, useUpdateTodolistMutation} from "../../../../api/todolistsApi";
import {DomainTodolist} from "../../../../api/todolistsApi.types";
import {AppStatus} from "../../../../../../app/appSlice";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";

type Props = {
    todolist: DomainTodolist
}

export const TodolistTitle = (props: Props) => {
    const {title, id, entityStatus} = props.todolist

    const [removeTodolist] = useRemoveTodolistMutation()
    const [updateTodolistTitle] = useUpdateTodolistMutation()

    const dispatch = useAppDispatch();

    const changeTodolistStatusHAndler = (status: AppStatus) => {
        dispatch(todolistApi.util.updateQueryData('fetchTodolists', undefined, state => {
            const todolist = state.find(tl => tl.id === id)
            if (todolist)
                todolist.entityStatus = status
        }))
    }

    const updateTodolistHandler = (title: string) => {
        updateTodolistTitle({todolistId: id, title})
    }
    const removeTodolistHandler = () => {
        changeTodolistStatusHAndler('loading')
        removeTodolist(id).unwrap().catch(() => {
            changeTodolistStatusHAndler('idle')
        })
    }

    return (
        <div className={"todolist-title-container"}>
            <h3><EditableSpan value={title} onChange={updateTodolistHandler}/></h3>
            <IconButton onClick={removeTodolistHandler} disabled={entityStatus === 'loading'}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}