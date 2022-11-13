type TodoListPropsType = {
    title: string
    tasks: TasksType[]
    removeTask: Function
}
type TasksType = {
    id: number
    title: string
    isDone: boolean
}

export function TodoList(props: TodoListPropsType) {
    const tasksMap = props.tasks.map((el) =>
        <div><input type={'checkbox'} checked={el.isDone}/>
            <span>{el.title}</span>
            <button onClick={() => {
                props.removeTask(el.id)
            }}>x
            </button>
        </div>)
    return (
        <div>
            <h3>{props.title}</h3>
            <input/>
            <button>+</button>
            {tasksMap}
            <button> All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    )
}