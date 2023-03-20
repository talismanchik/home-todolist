import axios from "axios";
import {ResponseType} from './todoList-api'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': 'bdb4b942-b3f2-464b-ac66-0924a79f31cf'
    }
})

//api
export const authAPI = {
    login(data: LoginParamsType) {
    return instance.post<ResponseType<{userId: number}>>(`auth/login`, data)
    },
    me(){
        return instance.get<ResponseType<MeParamsType>>(`auth/me`, )
    },
    logout(){
        return instance.delete<ResponseType>(`auth/login`)
    }
}

//types
 export type LoginParamsType = {
    email: string,
     password: string,
     rememberMe: boolean,
     captcha?: string,
 }

 export type MeParamsType = {
    email: string,
     id: number,
     login: string
 }