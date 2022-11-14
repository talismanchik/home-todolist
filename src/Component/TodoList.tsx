import {Title} from "./Title/Title";
import {TaskList} from "./TaskList/TaskList";
import {filterValuesType, TasksType} from "../App";

 export type TodoListPropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (id: number)=> void
     chengeFilter: (value: filterValuesType)=> void
}

export function TodoList(props: TodoListPropsType) {

    return (
        <div>
            <Title title={props.title}/>
            <TaskList tasks={props.tasks} removeTask={props.removeTask} changeFilter={props.chengeFilter}/>
        </div>
    )
}