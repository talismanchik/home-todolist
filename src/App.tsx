import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Component/TodoList";


export function App() {
    let initTasks = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS", isDone: true},
        {id: 4, title: "React", isDone: true},
        {id: 5, title: "Angular", isDone: false},
        {id: 6, title: "View", isDone: false}]

    let arr = useState(initTasks)

    let tasks = arr[0]
    let setTask = arr[1]

    function removeTask(id:number){
let filteredTasks = tasks.filter(el=>el.id !== id)
        setTask(filteredTasks)
    }

    return (
        <div className="App">

            <TodoList title={"First list"}
                      tasks={tasks}
                      removeTask={removeTask}
            />
        </div>
    );
}

export default App;
