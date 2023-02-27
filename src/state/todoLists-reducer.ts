import {v1} from "uuid";
import {todoListsApi, TodoListType} from "../api/todoList-api";
import {Dispatch} from "redux";

export type RemoveTodoListAT = {
    type: 'REMOVE_TODOLIST'
    id: string
}
export type AddTodoListAT = {
    type: 'ADD_TODOLIST'
    todoList: TodoListType
}
export type ChangeTodoListTitleAT = {
    type: 'CHANGE_TODOLIST_TITLE',
    id: string,
    title: string
}
export type ChangeTodoListFilterAT = {
    type: 'CHANGE_TODOLIST_FILTER'
    id: string
    filter: FilterValuesType
}
export type SetTodoListsAT = {
    type: 'SET_TODOLISTS'
    todoLists: TodoListType[]
}

export type TodoListActionType =
    | RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListFilterAT
    | ChangeTodoListTitleAT
    | SetTodoListsAT

export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed";

export const todolistId1 = v1();
export const todolistId2 = v1();
const initialState: TodolistDomainType[] = []

export const todoListsReducer = (state: TodolistDomainType[] = initialState, action: TodoListActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(el => el.id !== action.id)
        case 'ADD_TODOLIST':
            return [{...action.todoList, filter: 'all'}, ...state]
        case 'CHANGE_TODOLIST_TITLE':
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        case 'CHANGE_TODOLIST_FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        case 'SET_TODOLISTS':
            return action.todoLists.map(el => ({...el, filter: 'all'}))
        default:
            return state
    }
}

export const RemoveTodoListAC = (todolistId: string): RemoveTodoListAT => {
    return {type: 'REMOVE_TODOLIST', id: todolistId}
}
export const AddTodoListAC = (todoList: TodoListType): AddTodoListAT => {
    return {type: 'ADD_TODOLIST', todoList}
}
export const ChangeTodoListTitleAC = (todolistId: string, title: string): ChangeTodoListTitleAT => {
    return {type: 'CHANGE_TODOLIST_TITLE', id: todolistId, title: title}
}
export const ChangeTodoListFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodoListFilterAT => {
    return {type: 'CHANGE_TODOLIST_FILTER', id: todolistId, filter: filter}
}
export const SetTodoListsAC = (todoLists: TodoListType[]): SetTodoListsAT => {
    return {type: 'SET_TODOLISTS', todoLists}
}

export const getTodoListsTC = () => {
    return (dispatch: Dispatch) => {
        todoListsApi.getTodoLists()
            .then(res => {
                dispatch(SetTodoListsAC(res.data))
            })
    }
}

export const removeTodoListTC = (listID: string) => {
    return (dispatch: Dispatch) => {
        todoListsApi.deleteTodoList(listID)
            .then(res => {
                dispatch(RemoveTodoListAC(listID))
            })
    }
}
export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todoListsApi.createTodoList(title)
            .then(res => {
                dispatch(AddTodoListAC(res.data.data.item))
            })
    }
}

export const changeTodoListTitleTC = (listID: string, title: string) => {
    return (dispatch: Dispatch) => {
        todoListsApi.updateTodoList(listID, title)
            .then(res => {
                dispatch(ChangeTodoListTitleAC(listID, title))
            })
    }
}
