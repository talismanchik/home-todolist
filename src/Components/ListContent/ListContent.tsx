import React from 'react';
import {filterType, TasksType} from "../../App";
import {Button} from "../Button";


type ListContentPropsType = {
    tasks: TasksType[]
    removeTask: (id: string) => void
    filteredTasks: (value: filterType) => void
}

export const ListContent: React.FC<ListContentPropsType> = ({tasks, removeTask, filteredTasks}) => {

    let mappedTasks = tasks.map((el) => {
        return (
            <div key={el.id}>
                <Button
                    name={'x'}
                    callBack={() => removeTask(el.id)}/>
                <input type={"checkbox"} checked={el.isDone}/>
                <span>{el.title}</span>
            </div>
        )
    });
    return (
        <div>
            <div>
                {mappedTasks}
            </div>
            <div>
                <Button
                    name={"All"}
                    callBack={() => filteredTasks('all')}/>
                <Button
                    name={"Completed"}
                    callBack={() => filteredTasks('completed')}/>
                <Button
                    name={"Active"}
                    callBack={() => filteredTasks('active')}/>
            </div>
        </div>
    );
};
