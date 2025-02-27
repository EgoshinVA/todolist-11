import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {Tasks} from "./Tasks/Tasks";
import {useAddTaskMutation} from "../../../api/tasksApi";
import {DomainTodolist} from "../../../api/todolistsApi.types";

type Props = {
    todolist: DomainTodolist
}

export const Todolist = ({todolist}: Props) => {
    const [addTask] = useAddTaskMutation()

    const addTaskHandler = (title: string) => {
        addTask({title, todolistId: todolist.id})
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
