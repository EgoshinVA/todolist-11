import {AddItemForm} from "../../../../../common/components/AddItemForm";
import {TodolistType} from "../../../../../app/App";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {Tasks} from "./Tasks/Tasks";
import {addTaskAC} from "../../../../../model/tasks-reducer";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";

type Props = {
    todolist: TodolistType
}

export const Todolist = ({todolist}: Props) => {
    const dispatch = useAppDispatch();

    const addTask = (title: string) => {
        dispatch(addTaskAC({title, todolistId: todolist.id}))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTask}/>
            <Tasks todolist={todolist}/>
            <FilterTasksButtons todolist={todolist}/>
        </div>
    )
}
