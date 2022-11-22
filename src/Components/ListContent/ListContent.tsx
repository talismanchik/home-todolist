import React, {useState} from 'react';
import {filterType, TasksType} from "../../App";
import {Button} from "../Button";
import {Input} from "../Input";

type ListContentPropsType = {
    tasks: TasksType[]
    removeTask: (id: string) => void
    filteredTasks: (value: filterType) => void
}

export const ListContent = (props: ListContentPropsType) => {

    let mappedTasks = props.tasks.map((el) => {
        return (
            <div key={el.id}>
                <Button
                    name={'x'}
                    callBack={() => props.removeTask(el.id)}/>
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
                    callBack={() => props.filteredTasks('all')}/>
                <Button
                    name={"Completed"}
                    callBack={() => props.filteredTasks('completed')}/>
                <Button
                    name={"Active"}
                    callBack={() => props.filteredTasks('active')}/>
            </div>
        </div>
    );
};
