import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {
    addTodoListTC,
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    FilterValuesType,
    getTodoListsTC,
    removeTodoListTC,
    TodolistDomainType
} from "../../state/todoLists-reducer";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../сomponents/AddItemForm/AddItemForm";
import {TodoList} from "./TodoList";
import {Navigate} from "react-router-dom";

export const TodolistsList: React.FC = () => {
    const dispatch = useAppDispatch()
    const todoLists = useAppSelector<TodolistDomainType[]>(state => state.todoLists)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)


    useEffect(() => {
        if (!isLoggedIn){
            return
        }
        dispatch(getTodoListsTC())
    }, [])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodoListFilterAC(todolistId, value))
    }, [dispatch])
    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodoListTC(id))
    }, [dispatch])
    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodoListTitleTC(id, title))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

    if (!isLoggedIn){
        return <Navigate to={'/login'}/>
    }

    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todoLists.map(tl => {
                    return <Grid key={tl.id} item>
                        <Paper style={{padding: "10px"}}>
                            <TodoList
                                key={tl.id}
                                id={tl.id}
                                title={tl.title}
                                changeFilter={changeFilter}
                                filter={tl.filter}
                                entityStatus={tl.entityStatus}
                                removeTodolist={removeTodolist}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}