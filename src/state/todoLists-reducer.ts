import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: 'REMOVE_TODOLIST'
    id: string
}
export type AddTodoListAT = {
    type: 'ADD_TODOLIST'
    title: string
    listId: string
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

export type ActionType =
    RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListFilterAT
    | ChangeTodoListTitleAT

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed";

export  const todolistId1 = v1();
export const todolistId2 = v1();
const initialState: TodolistType[] = []

export const todoListsReducer = (state: TodolistType[] = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(el => el.id !== action.id)
        case 'ADD_TODOLIST':
            let newTodolist: TodolistType = {id: action.listId, title: action.title, filter: 'all'};
            return [newTodolist, ...state]
        case 'CHANGE_TODOLIST_TITLE':
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        case 'CHANGE_TODOLIST_FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        default:
            return state
    }
}

export const RemoveTodoListAC = (todolistId: string): RemoveTodoListAT => {
    return {type: 'REMOVE_TODOLIST', id: todolistId}
}
export const AddTodoListAC = (title: string): AddTodoListAT => {
return {type: 'ADD_TODOLIST', title: title, listId: v1()}
}
export const ChangeTodoListTitleAC = (todolistId: string, title: string): ChangeTodoListTitleAT => {
return {type: 'CHANGE_TODOLIST_TITLE',id: todolistId, title: title}
}
export const ChangeTodoListFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodoListFilterAT => {
return {type: 'CHANGE_TODOLIST_FILTER',id: todolistId, filter: filter}
}