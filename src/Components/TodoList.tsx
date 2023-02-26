import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button} from "@mui/material";
import {useAppSelector, useAppDispatch} from "../state/store";
import {addTaskAC, getTasksTC} from "../state/tasks-reducer";
import {FilterValuesType} from "../state/todoLists-reducer";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "../api/tasks-api";

type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType

}

export const TodoList: React.FC<PropsType> = React.memo(({
                                                  id,
                                                  title,
                                                  changeFilter,
                                                  removeTodolist,
                                                  changeTodolistTitle,
                                                  filter
                                              }) => {

    const dispatch = useAppDispatch()
    const tasks = useAppSelector<TaskType[]>(state => state.tasks[id])

    useEffect(()=>{
        dispatch(getTasksTC(id))
    },[])

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

    const tasksMap = tasksForTodolist.map(el=> <Task key={el.id} task={el} listId={id}/>)

    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolistHandler}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={(title) => dispatch(addTaskAC(title, id))}/>
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
