import {todoListsApi, TodoListType} from "../api/todoList-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAT, setAppStatusAC, setAppStatusAT} from "../app/app-reducer";

import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState: TodolistDomainType[] = []

export const todoListsReducer = (state: TodolistDomainType[] = initialState, action: TodoListActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(el => el.id !== action.todolistId)
        case 'ADD_TODOLIST':
            return [{...action.todoList, filter: 'all', entityStatus: "idle"}, ...state]
        case 'CHANGE_TODOLIST_TITLE':
            return state.map(el => el.id === action.todolistId ? {...el, title: action.title} : el)
        case 'CHANGE_TODOLIST_FILTER':
            return state.map(el => el.id === action.todolistId ? {...el, filter: action.filter} : el)
        case 'CHANGE_TODOLIST_ENTITY_STATUS':
            return state.map(el => el.id === action.todolistId ? {...el, entityStatus: action.status} : el)
        case 'SET_TODOLISTS':
            return action.todoLists.map(el => ({...el, filter: 'all', entityStatus: "idle"}))
        default:
            return state
    }
}
//actions
export const removeTodoListAC = (todolistId: string) => ({type: 'REMOVE_TODOLIST', todolistId} as const)
export const addTodoListAC = (todoList: TodoListType) => ({type: 'ADD_TODOLIST', todoList} as const)
export const changeTodoListTitleAC = (todolistId: string, title: string) =>
    ({type: 'CHANGE_TODOLIST_TITLE', todolistId, title} as const)
export const changeTodoListFilterAC = (todolistId: string, filter: FilterValuesType) =>
    ({type: 'CHANGE_TODOLIST_FILTER', todolistId, filter} as const)
export const changeTodoListEntityStatusAC = (todolistId: string, status: RequestStatusType) =>
    ({type: 'CHANGE_TODOLIST_ENTITY_STATUS', todolistId, status} as const)
export const setTodoListsAC = (todoLists: TodoListType[]) => ({type: 'SET_TODOLISTS', todoLists} as const)
//thunks
export const getTodoListsTC = () => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todoListsApi.getTodoLists()
            .then(res => {
                dispatch(setTodoListsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch(error=>{
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const removeTodoListTC = (listID: string) => {
    return (dispatch:ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodoListEntityStatusAC(listID, 'loading'))
        todoListsApi.deleteTodoList(listID)
            .then(res => {
                if (res.data.resultCode === 0){
                    dispatch(removeTodoListAC(listID))
                    dispatch(setAppStatusAC('succeeded'))
                }else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error=>{
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const addTodoListTC = (title: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todoListsApi.createTodoList(title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodoListAC(res.data.data.item))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error=>{
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const changeTodoListTitleTC = (listID: string, title: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todoListsApi.updateTodoList(listID, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                dispatch(changeTodoListTitleAC(listID, title))
                dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error=>{
                handleServerNetworkError(error, dispatch)
            })
    }
}
// types
export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}
export type FilterValuesType = "all" | "active" | "completed";
export type TodoListActionType =
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListEntityStatusAC>
    | ReturnType<typeof setTodoListsAC>

type ThunkDispatch = Dispatch<TodoListActionType | setAppStatusAT | setAppErrorAT>

