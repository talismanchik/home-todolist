import React from 'react';
import {filterType, tasksType} from "../../App";
import {Button} from "../Button";
import s from './ListContent.module.css'



type ListContentPropsType = {
    todoListId: string
    tasks: tasksType[]
    removeTask: (todoListId: string, id: string) => void
    filteredTasks: (todoListId: string, value: filterType) => void
    changeStatus: (todoListId: string, taskID: string, newIsDone: boolean) => void
    filter: filterType
}

export const ListContent: React.FC<ListContentPropsType> = ({todoListId, filter, changeStatus, tasks, removeTask, filteredTasks}) => {

    const onchangeHandler = (taskID: string, eventValue: boolean) => {changeStatus(todoListId, taskID, eventValue)}

    let mappedTasks = tasks.map((el) => {
        return (
            <div key={el.id} className={el.isDone? s.isDone: ''}>
                <Button
                    name={'x'}
                    callBack={() => removeTask(todoListId, el.id)}/>
                <input type={"checkbox"}
                       onChange={(event) => onchangeHandler(el.id, event.currentTarget.checked)}
                       checked={el.isDone}/>
                <span>{el.title}</span>
            </div>
        )
    });
    return (
        <div>
            <div >
                {mappedTasks}
            </div>
            <div>
                <Button
                    className={filter === 'all' ?s.buttonActive : ''}
                    name={"All"}
                    callBack={() => filteredTasks(todoListId, 'all')}/>
                <Button
                    className={filter === 'completed' ?s.buttonActive : ''}
                    name={"Completed"}
                    callBack={() => filteredTasks(todoListId, 'completed')}/>
                <Button
                    className={filter === 'active' ?s.buttonActive : ''}
                    name={"Active"}
                    callBack={() => filteredTasks(todoListId, 'active')}/>
            </div>
        </div>
    );
};
