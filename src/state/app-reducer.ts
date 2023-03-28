import {Dispatch} from "redux";
import {authAPI} from "../api/auth-api";
import {setIsLoggedInAC} from "./auth-reducer";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null,
    isInitialized: false,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

//Actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const isInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

//Thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
            }
            dispatch(isInitializedAC(true))
        })
}

//Types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
    status: RequestStatusType,
    error: string | null
    isInitialized: boolean
}
export type  SetAppStatusAT = ReturnType<typeof setAppStatusAC>
export type  SetAppErrorAT = ReturnType<typeof setAppErrorAC>
export type  isInitializedAT = ReturnType<typeof isInitializedAC>
type ActionsType =
    | SetAppErrorAT
    | SetAppStatusAT
    | isInitializedAT