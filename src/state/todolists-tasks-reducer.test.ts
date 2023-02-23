import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {AddTodoListAC, RemoveTodoListAC, TodolistDomainType, todoListsReducer} from "./todoLists-reducer";
import {TaskStatuses, TodoTaskPriorities} from "../api/tasks-api";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodolistDomainType> = []

    const action = AddTodoListAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.listId)
    expect(idFromTodoLists).toBe(action.listId)
})
test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
            }
        ]
    }

    const action = RemoveTodoListAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

