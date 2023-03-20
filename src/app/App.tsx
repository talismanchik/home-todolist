import React, {useCallback, useEffect} from 'react';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, CircularProgress, Container, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import LinearProgress from '@mui/material/LinearProgress';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../state/store";
import {initializeAppTC, RequestStatusType} from "../state/app-reducer";
import ErrorSnackbar from "../сomponents/ErrorSnackbar/ErrorSnackbar";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {logOutTC} from "../state/auth-reducer";

function App() {
   const dispatch = useAppDispatch()
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    useEffect(()=>{
        dispatch(initializeAppTC())
    }, [])

const logoutHandler = useCallback(()=>{
    dispatch(logOutTC())
}, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
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
                    {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path='*' element={<Navigate to={'/404'}/>}/>
                    <Route path = '/404' element = {<h1>404: PAGE NOT FOUND</h1>}/>
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
