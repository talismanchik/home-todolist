import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Component/TodoList";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

export type filterValuesType = "All" | "Completed" | "Active"

export function App() {

    let [tasks, setTask] = useState<TasksType[]>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS", isDone: true},
        {id: 4, title: "React", isDone: true},
        {id: 5, title: "Angular", isDone: false},
        {id: 6, title: "View", isDone: false}])
    let [filter, setFilter] = useState<filterValuesType>("All")

    let tasksForTodoList = tasks
    if(filter === "Completed"){
        tasksForTodoList = tasks.filter(el=> el.isDone)
    }
    if (filter === "Active"){
        tasksForTodoList = tasks.filter((el=> !el.isDone))
    }
    
    function changeFilter(value: filterValuesType) {
        setFilter(value)
    }

    function removeTask(id: number) {
        let filteredTasks = tasks.filter(el => el.id !== id)
        setTask(filteredTasks)
    }

    return (
        <div className="App">

            <TodoList title={"First list"}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      chengeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
