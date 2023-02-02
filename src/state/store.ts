import {combineReducers, legacy_createStore} from "redux";
import {todoListsReducer} from "./todoLists-reducer";
import {tasksReducer} from "./tasks-reducer";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer
    }
)
export type AppRootState = ReturnType<typeof rootReducer>
export const store = legacy_createStore(rootReducer)

