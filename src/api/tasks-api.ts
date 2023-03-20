import axios from "axios";
import {ResponseType} from "./todoList-api";
import {RequestStatusType} from "../state/app-reducer";

export default {
    title: 'API'
}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': 'bdb4b942-b3f2-464b-ac66-0924a79f31cf'
    }
})
// api
export const tasksAPI = {
    getTasks(todoListId: string){
        return instance.get<GetTaskResponseType>(`todo-lists/${todoListId}/tasks`)
    },
    createTask(todoListId: string, title: string){
        return instance.post<ResponseType<{item: TaskType }>>(`todo-lists/${todoListId}/tasks`, {title})
    },
    deleteTask(todoListId: string, taskId: string){
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    updateTask(todoListId: string, taskId: string, task: any){
        return instance.put<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`, task)
    }
}
// types
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TodoTaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    id: string
    title: string
    status: TaskStatuses
    todoListId: string
    description: string
    startDate: string | null
    deadline: string | null
    addedDate: string
    order: number
    priority: TodoTaskPriorities
}
export type GetTaskResponseType = {
    error: string | null,
    totalCount: number,
    items: TaskType[]
}
export type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}