import React from 'react';
import {Title} from "./Title/Title";
import {ListContent} from "./ListContent/ListContent";
import {filterType, TasksType} from "../App";

type TodoListPropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (id: string) => void
    filteredTasks: (value: filterType) => void
    addedList: (val: string) => void
}

export const TodoList: React.FC<TodoListPropsType> = (
    {
        title,
        tasks,
        removeTask,
        filteredTasks,
        addedList
    }) => {
    return   (
        <div>
            <Title
                title={title}
                addedList={addedList}/>
            <ListContent
                tasks={tasks}
                removeTask={removeTask}
                filteredTasks={filteredTasks}/>
        </div>
    );
};
