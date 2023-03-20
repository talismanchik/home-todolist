import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../сomponents/AddItemForm/AddItemForm';
import {EditableSpan} from '../../сomponents/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button} from "@mui/material";
import {useAppSelector, useAppDispatch} from "../../state/store";
import {addTaskTC, getTasksTC, TaskDomainType} from "../../state/tasks-reducer";
import {FilterValuesType} from "../../state/todoLists-reducer";
import {Task} from "./Todolist/Task/Task";
import {TaskStatuses, TaskType} from "../../api/tasks-api";
import {RequestStatusType} from "../../state/app-reducer";

type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const TodoList: React.FC<PropsType> = React.memo(({
                                                             id,
                                                             title,
                                                             changeFilter,
                                                             removeTodolist,
                                                             changeTodolistTitle,
                                                             filter,
                                                             entityStatus,
                                                         }) => {

    const dispatch = useAppDispatch()
    const tasks = useAppSelector<TaskDomainType[]>(state => state.tasks[id])

    useEffect(() => {
        dispatch(getTasksTC(id))
    }, [])

    const removeTodolistHandler = () => {
        removeTodolist(id);
    }
    const changeTodolistTitleHandler = useCallback((title: string) => {
        changeTodolistTitle(id, title);
    }, [changeTodolistTitle, id])

    let tasksForTodolist = tasks;
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    const tasksMap = tasksForTodolist.map(el => <Task key={el.id} task={el} listId={id}/>)

    return <div>
        <h3><EditableSpan value={title}
                          disabled={entityStatus==='loading'}
                          onChange={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolistHandler}
                        disabled={entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={(title) => dispatch(addTaskTC(title, id))}
                     disabled={entityStatus === 'loading'}/>
        {tasksMap}
        <div>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={() => changeFilter("all", id)}
                    color={'inherit'}>All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={() => changeFilter("active", id)}
                    color={'primary'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={() => changeFilter("completed", id)}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})
