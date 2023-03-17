import React from 'react';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import LinearProgress from '@mui/material/LinearProgress';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {RequestStatusType} from "./app-reducer";
import ErrorSnackbar from "../сomponents/ErrorSnackbar/ErrorSnackbar";

function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    return (
        <div>
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6"
                                component="div"
                                sx={{flexGrow: 1}}>
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
}

export default App;