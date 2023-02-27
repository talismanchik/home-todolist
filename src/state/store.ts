import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todoListsReducer} from "./todoLists-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer
    }
)
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatchType<Arg = void> = ThunkDispatch<AppRootStateType, Arg, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

