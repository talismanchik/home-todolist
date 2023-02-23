import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todoLists-reducer";
import {TaskStatuses, TaskType, TodoTaskPriorities} from "../api/tasks-api";


export type removeTaskAT = {
    type: 'REMOVE_TASK',
    taskId: string,
    listId: string
}
export type addTaskAT = {
    type: 'ADD_TASK'
    title: string,
    listID: string
}
export type changeTaskStatusAT = {
    type: 'CHANGE_TASK_STATUS'
    taskID: string,
    status: TaskStatuses,
    listID: string
}
export type changeTaskTitleAT = {
    type: 'CHANGE_TASK_TITLE'
    taskID: string,
    title: string,
    listID: string
}

export  type ActionType = removeTaskAT |
    addTaskAT |
    changeTaskStatusAT |
    changeTaskTitleAT |
    AddTodoListAT |
    RemoveTodoListAT
export type TasksStateType = {
    [key: string]: TaskType[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {...state, [action.listId]: state[action.listId].filter(el => el.id !== action.taskId)}
        case 'ADD_TASK':
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.listID,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
            }
            return {...state, [action.listID]: [...state[action.listID], newTask]}
        case 'CHANGE_TASK_STATUS':
            return {
                ...state,
                [action.listID]: state[action.listID].map(el => el.id === action.taskID ? {
                    ...el,
                    status: action.status
                } : el)
            }
        case 'CHANGE_TASK_TITLE':
            return {
                ...state,
                [action.listID]: state[action.listID].map(el => el.id === action.taskID ? {
                    ...el,
                    title: action.title
                } : el)
            }
        case 'ADD_TODOLIST':
            return {...state, [action.listId]: []}
        case "REMOVE_TODOLIST":
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, listId: string): removeTaskAT => {
    return {type: 'REMOVE_TASK', taskId, listId}
}
export const addTaskAC = (title: string, listID: string): addTaskAT => {
    return {type: 'ADD_TASK', title, listID}
}
export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, listID: string): changeTaskStatusAT => {
    return {type: 'CHANGE_TASK_STATUS', taskID, status, listID}
}
export const changeTaskTitleAC = (taskID: string, title: string, listID: string): changeTaskTitleAT => {
    return {type: 'CHANGE_TASK_TITLE', taskID, title, listID}
}