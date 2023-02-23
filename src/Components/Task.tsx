import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../api/tasks-api";

type TaskPropsType = {
    listId: string,
    task: TaskType
}
export const Task = (props: TaskPropsType) => {
    const dispatch = useDispatch()
    const onClickHandler = () => dispatch(removeTaskAC(props.task.id, props.listId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(props.task.id, newIsDoneValue? TaskStatuses.Completed: TaskStatuses.New, props.listId))
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newValue, props.listId))
    },[dispatch, props.task.id, props.listId])

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />
        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
}