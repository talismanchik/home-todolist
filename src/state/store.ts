import {combineReducers, legacy_createStore} from "redux";
import {todoListsReducer} from "./todoLists-reducer";
import {tasksReducer} from "./tasks-reducer";

const rootReduser = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer
    }
)
export type AppRootState = ReturnType<typeof rootReduser>
export const store = legacy_createStore(rootReduser)

