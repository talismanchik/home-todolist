import {AddTodoListAT, RemoveTodoListAT, SetTodoListsAT} from "./todoLists-reducer";
import {tasksApi, TaskType, UpdateTaskType} from "../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


export type removeTaskAT = {
    type: 'REMOVE_TASK',
    taskId: string,
    listId: string
}
export type addTaskAT = {
    type: 'ADD_TASK'
    task: TaskType
}
export type updateTaskAT = {
    type: 'UPDATE_TASK'
    taskID: string,
    model: UpdateDomainTaskModelType,
    listID: string
}
export type SetTasksAT = {
    type: 'SET_TASKS'
    tasks: TaskType[]
    listID: string
}


export  type TasksActionType = removeTaskAT |
    addTaskAT |
    updateTaskAT |
    AddTodoListAT |
    RemoveTodoListAT |
    SetTodoListsAT |
    SetTasksAT

export type TasksStateType = {
    [key: string]: TaskType[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {...state, [action.listId]: state[action.listId].filter(el => el.id !== action.taskId)}
        case 'ADD_TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE_TASK':
            return {
                ...state,
                [action.listID]: state[action.listID].map(el => el.id === action.taskID
                    ? {...el, ...action.model}
                    : el)
            }
        case 'ADD_TODOLIST':
            return {...state, [action.todoList.id]: []}
        case "REMOVE_TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case 'SET_TODOLISTS': {
            const copyState = {...state}
            action.todoLists.forEach(el => copyState[el.id] = [])
            return copyState
        }
        case 'SET_TASKS': {
            const copyState = {...state}
            copyState[action.listID] = action.tasks
            return copyState
        }

        default:
            return state
    }
}

export const removeTaskAC = (listId: string, taskId: string): removeTaskAT => {
    return {type: 'REMOVE_TASK', listId, taskId}
}
export const addTaskAC = (task: TaskType): addTaskAT => {
    return {type: 'ADD_TASK', task}
}
export const updateTaskAC = (taskID: string, model: UpdateDomainTaskModelType, listID: string): updateTaskAT => {
    return {type: 'UPDATE_TASK', taskID, model, listID}
}
export const SetTasksAC = (listID: string, tasks: TaskType[]): SetTasksAT => {
    return {type: 'SET_TASKS', listID, tasks}
}

export const getTasksTC = (listID: string) => {
    return (dispatch: Dispatch) => {
        tasksApi.getTasks(listID)
            .then(res => {
                dispatch(SetTasksAC(listID, res.data.items))
            })
    }
}

export const removeTasksTC = (listID: string, taskID: string) => {

    return (dispatch: Dispatch) => {
        tasksApi.deleteTask(listID, taskID)
            .then(res => {
                dispatch(removeTaskAC(listID, taskID))
            })
    }
}

export const addTaskTC = (title: string, listID: string) => {
    return (dispatch: Dispatch) => {
        tasksApi.createTask(listID, title)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string | null
    deadline?: string | null
}
export const updateTaskTC = (taskID: string, domainModel: UpdateDomainTaskModelType, listID: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[listID].find(el => el.id === taskID)
        if (!task) {
            console.warn('task not found in the state')
            return
        }
        const apiModel: UpdateTaskType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        tasksApi.updateTask(listID, taskID, apiModel)
            .then(res => {
                dispatch(updateTaskAC(taskID, apiModel, listID))
            })
    }
}