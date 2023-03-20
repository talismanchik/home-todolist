import {
    addTodoListAC, removeTodoListAC,
    setTodoListsAC,
} from "./todoLists-reducer";
import {tasksAPI, TaskType, UpdateTaskType} from "../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {RequestStatusType, SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {...state, [action.listId]: state[action.listId].filter(el => el.id !== action.taskId)}
        case 'ADD_TASK':
            return {...state, [action.task.todoListId]: [{...action.task, entityStatus: 'idle'}, ...state[action.task.todoListId]]}
        case 'UPDATE_TASK':
            return {
                ...state, [action.listID]: state[action.listID]
                    .map(el => el.id === action.taskID ? {...el, ...action.model} : el)
            }
        case 'ADD_TODOLIST':
            return {...state, [action.todoList.id]: []}
        case "REMOVE_TODOLIST": {
            const copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        }
        case 'SET_TODOLISTS': {
            const copyState = {...state}
            action.todoLists.forEach(el => copyState[el.id] = [])
            return copyState
        }
        case 'SET_TASKS':{
           return {...state, [action.listID]: action.tasks.map(el=>({...el,  entityStatus: 'idle'}))}
        }
        case "CHANGE_TASK_ENTITY_STATUS":
            return {...state, [action.listID]: state[action.listID].map(el=>el.id === action.taskID? {...el, entityStatus: action.status}: el)}
        default:
            return state
    }
}
// actions
export const removeTaskAC = (listId: string, taskId: string) => ({type: 'REMOVE_TASK', listId, taskId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD_TASK', task} as const)
export const updateTaskAC = (taskID: string, model: UpdateDomainTaskModelType, listID: string) =>
    ({type: 'UPDATE_TASK', taskID, model, listID} as const)
export const setTasksAC = (listID: string, tasks: TaskType[]) => ({type: 'SET_TASKS', listID, tasks} as const)
export const changeTaskEntityStatusAC = (listID: string, taskID: string, status:RequestStatusType) => ({type: 'CHANGE_TASK_ENTITY_STATUS', listID, taskID, status} as const)

// thunks
export const getTasksTC = (listID: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.getTasks(listID)
        .then(res => {
            dispatch(setTasksAC(listID, res.data.items))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTasksTC = (listID: string, taskID: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC(listID, taskID, 'loading'))
    tasksAPI.deleteTask(listID, taskID)
            .then(res => {
                    if (res.data.resultCode === 0){
                        dispatch(removeTaskAC(listID, taskID))
                        dispatch(setAppStatusAC('succeeded'))
                    }else {
                        handleServerAppError(res.data, dispatch)
                    }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })

}
export const addTaskTC = (title: string, listID: string) => (dispatch:ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.createTask(listID, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC = (taskID: string, domainModel: UpdateDomainTaskModelType, listID: string) =>
    (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
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
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTaskEntityStatusAC(listID, taskID, 'loading'))
        tasksAPI.updateTask(listID, taskID, apiModel)
            .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC(taskID, apiModel, listID))
                        dispatch(setAppStatusAC('succeeded'))
                        dispatch(changeTaskEntityStatusAC(listID, taskID, 'succeeded'))
                    } else {
                        handleServerAppError(res.data, dispatch)
                        dispatch(changeTaskEntityStatusAC(listID, taskID, 'failed'))
                    }

            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string | null
    deadline?: string | null
}
export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}
export type TasksStateType = {
    [key: string]: TaskDomainType[]
}
export  type TasksActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof changeTaskEntityStatusAC>

type ThunkDispatch = Dispatch<TasksActionType | SetAppStatusAT | SetAppErrorAT>