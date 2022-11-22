import React from 'react';
import {Title} from "./Title/Title";
import {ListContent} from "./ListContent/ListContent";
import {filterType, TasksType} from "../App";

type TodoListPropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (id: string) => void
    filteredTasks: (value: filterType) => void
    callBack: () => void
    inputText: string
    setInputText: (value: string) => void

}

export const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <Title
                title={props.title}
                callBack={props.callBack}
                inputText={props.inputText}
                setInputText={props.setInputText}/>
            <ListContent
                tasks={props.tasks}
                removeTask={props.removeTask}
                filteredTasks={props.filteredTasks}/>
        </div>
    );
};
