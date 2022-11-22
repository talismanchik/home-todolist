import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./Components/TodoList";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type filterType = 'all' | 'completed' | 'active'


function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);
    let [filter, setFilter] = useState('all')

    let [inputText, setInputText] = useState('')

    const addedList = (val: string) => {
        let newTask = {id: v1(), title: val, isDone: false}
        setTasks([...tasks, newTask])
    }

    const callBackButtonForInput = () => {
        addedList(inputText)
        setInputText('')
    }


    const removeTask = (id: string) => {
        setTasks(tasks.filter(el => el.id !== id))
    }
    let filterTasks = tasks;
    if (filter === 'completed') filterTasks = tasks.filter(el => el.isDone)
    if (filter === 'active') filterTasks = tasks.filter(el => !el.isDone)

    const filteredTasks = (value: filterType) => {
        setFilter(value)
    }

    return (
        <div className="App">
            <TodoList
                title={"First list"}
                tasks={filterTasks}
                removeTask={removeTask}
                filteredTasks={filteredTasks}
                inputText={inputText}
                setInputText={setInputText}
                callBack={callBackButtonForInput}
            />
        </div>
    );
}

export default App;

