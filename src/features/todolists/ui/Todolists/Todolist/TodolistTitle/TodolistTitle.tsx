import React from 'react';
import {EditableSpan} from "../../../../../../common/components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TodolistType} from "../../../../../../app/App";
import {changeTodolistTitleAC, removeTodolistAC} from "../../../../../../model/todolists-reducer";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";

type Props = {
    todolist: TodolistType
}

export const TodolistTitle = (props: Props) => {
    const {title, id} = props.todolist
    const dispatch = useAppDispatch();
    const updateTodolistHandler = () => {
        dispatch(changeTodolistTitleAC({id, title}))
    }
    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(id))
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