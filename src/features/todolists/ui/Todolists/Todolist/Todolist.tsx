import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {Tasks} from "./Tasks/Tasks";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";
import {addTask} from "../../../model/tasksSlice";
import {DomainTodolist} from "../../../model/todolistsSlice";

type Props = {
    todolist: DomainTodolist
}

export const Todolist = ({todolist}: Props) => {
    const dispatch = useAppDispatch();

    const addTaskHandler = (title: string) => {
        dispatch(addTask({title, todolistId: todolist.id}))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTaskHandler}/>
            <Tasks todolist={todolist}/>
            <FilterTasksButtons todolist={todolist}/>
        </div>
    )
}
