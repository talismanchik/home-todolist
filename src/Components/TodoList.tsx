import React from 'react';
import {AddItem} from "./Title/AddItem";
import {ListContent} from "./ListContent/ListContent";
import {filterType, tasksType} from "../App";

type TodoListPropsType = {
    todoListId: string
    filter: filterType
    title: string
    tasks: tasksType[]
    removeTask: (todoListId: string, id: string) => void
    filteredTasks: (todoListId: string, value: filterType) => void
    addedList: (todoListId: string, val: string) => void
    changeStatus: (todoListId: string, taskID: string, newIsDone: boolean)=>void
}

export const TodoList: React.FC<TodoListPropsType> = (
    {
        todoListId,
        filter,
        title,
        tasks,
        removeTask,
        filteredTasks,
        changeStatus,
        addedList
    }) => {

    const addListHandler =( val: string)=>{
        addedList(todoListId, val)
    }

    return   (
        <div>
            <h2>{title}</h2>
            <AddItem
                addedItem={addListHandler}/>
            <ListContent
                todoListId={todoListId}
                filter={filter}
                tasks={tasks}
                removeTask={removeTask}
                filteredTasks={filteredTasks}
                changeStatus={changeStatus}/>
        </div>
    );
};
