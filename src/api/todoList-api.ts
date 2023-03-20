import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': 'bdb4b942-b3f2-464b-ac66-0924a79f31cf'
    }
})
// api
export const todoListsAPI = {
    getTodoLists() {
        return instance.get<TodoListType[]>('todo-lists')
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{item: TodoListType }>>('todo-lists', {title})
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}`)
    },
    updateTodoList(todoListId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoListId}`, {title})
    }
}
// types
export type TodoListType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number,
    messages: string[],
    data: D
}