import React, {ChangeEvent} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "../state/tasks-reducer";
import {FilterValuesType} from "../state/todoLists-reducer";

type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType

}

export const TodoList: React.FC<PropsType> = ({
                                                  id,
                                                  title,
                                                  changeFilter,
                                                  removeTodolist,
                                                  changeTodolistTitle,
                                                  filter
                                              }) => {

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[id])

    const removeTodolistHandler = () => {
        removeTodolist(id);
    }
    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(id, title);
    }

    let tasksForTodolist = tasks;
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolistHandler}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={(title) => dispatch(addTaskAC(title, id))}/>
        <div>
            {
                tasksForTodolist.map(el => {
                    const onClickHandler = () => dispatch(removeTaskAC(el.id, id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(el.id, newIsDoneValue, id))
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(el.id, newValue, id))
                    }

                    return <div key={el.id} className={el.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={el.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        />
                        <EditableSpan value={el.title} onChange={onTitleChangeHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
            }
        </div>
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
}


