import React, {useCallback} from 'react';
import {TodoList} from './Components/TodoList';
import {AddItemForm} from './Components/AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC, FilterValuesType,
    RemoveTodoListAC, TodolistDomainType,
} from "./state/todoLists-reducer";

function App() {
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, TodolistDomainType[]>(state => state.todoLists)

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(ChangeTodoListFilterAC(todolistId, value))
    }, [dispatch])
    const removeTodolist = useCallback((id: string) => {
        dispatch(RemoveTodoListAC(id))
    }, [dispatch])
    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(ChangeTodoListTitleAC(id, title))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(AddTodoListAC(title))
    }, [dispatch])

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
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
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
