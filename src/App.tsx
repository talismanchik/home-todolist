import React, {useCallback, useEffect} from 'react';
import {TodoList} from './Components/TodoList';
import {AddItemForm} from './Components/AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useAppSelector, useAppDispatch} from "./state/store";
import {    addTodoListTC, ChangeTodoListFilterAC,
    changeTodoListTitleTC,    FilterValuesType,
    getTodoListsTC, removeTodoListTC,
    TodolistDomainType} from "./state/todoLists-reducer";

function App() {
    const dispatch = useAppDispatch()
    const todoLists = useAppSelector<TodolistDomainType[]>(state => state.todoLists)

    useEffect(() => {
        dispatch(getTodoListsTC())
    }, [])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(ChangeTodoListFilterAC(todolistId, value))
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

    return (
        <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6"
                                    component="div"
                                    sx={{ flexGrow: 1 }}>
                            Todolist
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
