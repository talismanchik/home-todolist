import React, {useState} from 'react';
import s from './App.module.css';
import {v1} from "uuid";
import {TodoList} from "./Components/TodoList";
import {AddItem} from "./Components/Title/AddItem";

export type filterType = 'all' | 'completed' | 'active'

type todoListType = {
    id: string,
    title: string,
    filter: filterType
}
type tasksListType = {
    [todoListId: string]: tasksType[]
}

export type tasksType = {
    id: string
    title: string
    isDone: boolean
}

function App() {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todoLists, setTodoLists] = useState<todoListType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<tasksListType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Sugar", isDone: false},
            {id: v1(), title: "Salt", isDone: false},
        ],
    })
    const addedList =(val: string)=>{
        const newList:todoListType ={
            id: v1(),
            title: val,
            filter: "all"
        }
        setTodoLists([newList, ...todoLists])
        setTasks({
            ...tasks,
            [newList.id]:[]
        })
    }

    const addedTask = (todoListId: string, val: string) => {
        const newTask: tasksType = {id: v1(), title: val, isDone: false}
        setTasks({...tasks, [todoListId]:[...tasks[todoListId], newTask]})
    }

    const removeTask = (todoListId: string, id: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(el=> el.id !== id)})
    }

    const filteredTasks = (todoListId: string, value: filterType) => {
        setTodoLists(todoLists.map(el=> el.id === todoListId? {...el, filter: value}: el))
    }

    const changeStatus = (todoListId: string, taskID: string, newIsDone: boolean) => {
setTasks({...tasks, [todoListId]: tasks[todoListId].map(el=>el.id === taskID? {...el, isDone:newIsDone}: el)})

    }
    let todolistMap = todoLists.map(el => {
        let filterTasks = tasks[el.id];
        if (el.filter === "completed") filterTasks = tasks[el.id].filter(el=> el.isDone)
        if (el.filter === "active") filterTasks = tasks[el.id].filter(el=> !el.isDone)




        return (
            <TodoList
                todoListId={el.id}
                title={el.title}
                tasks={filterTasks}
                removeTask={removeTask}
                filteredTasks={filteredTasks}
                addedList={addedTask}
                changeStatus={changeStatus}
                filter={el.filter}
            />
        )
    })

    return (
        <div className={s.App}>
            <AddItem addedItem={addedList}/>
            {todolistMap}
        </div>
    );
}

export default App;

