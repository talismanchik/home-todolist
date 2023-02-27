import {useState} from "react";
import {ResponseType, todoListsApi, TodoListType} from "../api/todoList-api";
import {GetTaskResponseType, tasksApi, TaskType} from "../api/tasks-api";

export default {
    title: 'API'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<TodoListType[] | null>(null)

    const getTodoLists = () => {
        todoListsApi.getTodoLists()
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <button onClick={getTodoLists}>get TodoLists</button>
        </div>
    </div>
}
export const CreateTodoLists = () => {
    const [state, setState] = useState<ResponseType<{item: TodoListType }> | null>(null)
    const [title, setTitle] = useState('')

    const createTodoLists = () => {
        todoListsApi.createTodoList(title)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'title'} value={title} onChange={(e)=> setTitle(e.currentTarget.value)}/>
            <button onClick={createTodoLists}>create TodoLists</button>
        </div>
    </div>
}
export const DeleteTodoLists = () => {
    const [state, setState] = useState<ResponseType | null>(null)
    const [todoListId, setTodoListId] = useState('')

    const deleteTodoLists = () => {
        todoListsApi.deleteTodoList(todoListId)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todoListId'} value={todoListId} onChange={(e)=> setTodoListId(e.currentTarget.value)}/>
            <button onClick={deleteTodoLists}>delete TodoLists</button>
        </div>
    </div>
}
export const UpdateTodoLists = () => {
    const [state, setState] = useState<ResponseType | null>(null)
    const [todoListId, setTodoListId] = useState('')
    const [title, setTitle] = useState('')

    const updateTodoLists = () => {
        todoListsApi.updateTodoList(todoListId, title)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todoListId'} value={todoListId} onChange={(e)=> setTodoListId(e.currentTarget.value)}/>
            <input placeholder={'title'} value={title} onChange={(e)=> setTitle(e.currentTarget.value)}/>
            <button onClick={updateTodoLists}>update TodoLists</button>
        </div>
    </div>
}


export const GetTasks = () => {
    const [state, setState] = useState<GetTaskResponseType | null>(null)
    const [todoListId, setTodoListId] = useState('')

    const getTasks = () => {
        tasksApi.getTasks(todoListId)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todoListId'} value={todoListId} onChange={(e)=> setTodoListId(e.currentTarget.value)}/>
            <button onClick={getTasks}>get Tasks</button>
        </div>
    </div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<ResponseType<{item: TaskType }> | null>(null)
    const [title, setTitle] = useState('')
    const [todoListId, setTodoListId] = useState('')

    const createTasks = () => {
        tasksApi.createTask(todoListId, title)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todoListId'} value={todoListId} onChange={(e)=> setTodoListId(e.currentTarget.value)}/>
            <input placeholder={'title'} value={title} onChange={(e)=> setTitle(e.currentTarget.value)}/>
            <button onClick={createTasks}>create Task</button>
        </div>
    </div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<ResponseType | null>(null)
    const [todoListId, setTodoListId] = useState('')
    const [taskId, setTaskId] = useState('')

    const deleteTasks = () => {
        tasksApi.deleteTask(todoListId, taskId)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todoListId'} value={todoListId} onChange={(e)=> setTodoListId(e.currentTarget.value)}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e)=> setTaskId(e.currentTarget.value)}/>
            <button onClick={deleteTasks}>delete Task</button>
        </div>
    </div>
}
export const UpdateTasks = () => {
    const [state, setState] = useState<ResponseType | null>(null)
    const [todoListId, setTodoListId] = useState('')
    const [taskId, setTaskId] = useState('')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [priority, setPriority] = useState('')
    const [startDate, setStartDate] = useState('')
    const [deadline, setDeadline] = useState('')

    const task = {
        title,
        description,
        status,
        priority,
        startDate,
        deadline,
    }

    const updateTask = () => {
        tasksApi.updateTask(todoListId, taskId, task)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistID'}
                   value={todoListId}
                   onChange={(e) => setTodoListId(e.currentTarget.value)}/>
            <input placeholder={'taskID'}
                   value={taskId}
                   onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <input placeholder={'Task Title'}
                   value={title}
                   onChange={(e) => setTitle(e.currentTarget.value)}/>
            <input placeholder={'Description'}
                   value={description}
                   onChange={(e) => setDescription(e.currentTarget.value)}/>
            <input placeholder={'Status'}
                   value={status}
                   onChange={(e) => setStatus(e.currentTarget.value)}/>
            <button onClick={updateTask}> update task</button>
        </div>
    </div>
}