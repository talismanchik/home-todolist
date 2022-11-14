import {filterValuesType, TasksType} from "../../App";



type TaskListPropsType={
    tasks: TasksType[]
    removeTask: (id: number)=> void
    changeFilter: (value: filterValuesType)=> void
}

export const TaskList=(props: TaskListPropsType)=>{
    const tasksMap = props.tasks.map((el) =>
        <div><input type={'checkbox'} checked={el.isDone}/>
            <span>{el.title}</span>
            <button onClick={() => {
                props.removeTask(el.id)
            }}>x
            </button>
        </div>)

return(
    <div>
        {tasksMap}
        <button onClick={()=>{props.changeFilter("All")}}> All</button>
        <button onClick={()=>{props.changeFilter("Active")}}>Active</button>
        <button onClick={()=>{props.changeFilter("Completed")}}>Completed</button>

    </div>
)
}