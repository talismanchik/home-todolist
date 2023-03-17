import {ResponseType} from "../api/todoList-api";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppErrorAT, setAppStatusAC, setAppStatusAT} from "../app/app-reducer";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error!...'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error:{message: string}, dispatch: ErrorUtilsDispatchType)=>{
    dispatch(setAppStatusAC('failed'))
    dispatch(setAppErrorAC(error.message))
}
type ErrorUtilsDispatchType = Dispatch<setAppErrorAT | setAppStatusAT>