import {removeTasksTC, TaskDomainType, updateTaskTC} from "../../../../state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox} from "@mui/material";
import {EditableSpan} from "../../../../сomponents/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../../../api/tasks-api";
import {useAppDispatch} from "../../../../state/store";

type TaskPropsType = {
    listId: string,
    task: TaskDomainType
}
export const Task = (props: TaskPropsType) => {
    const dispatch = useAppDispatch()
    const onClickHandler = () => dispatch(removeTasksTC(props.listId, props.task.id))

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
        dispatch(updateTaskTC(props.task.id, {status}, props.listId))
    }
    const onTitleChangeHandler = useCallback((title: string) => {
        dispatch(updateTaskTC(props.task.id, {title}, props.listId))
    }, [dispatch, props.task.id, props.listId])

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
            disabled={props.task.entityStatus === "loading"}
        />
        <EditableSpan value={props.task.title}
                      disabled={props.task.entityStatus === "loading"}
                      onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}
                    disabled={props.task.entityStatus === 'loading'}>
            <Delete/>
        </IconButton>
    </div>
}