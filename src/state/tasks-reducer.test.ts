import {
    addTaskAC,
    removeTaskAC,
    SetTasksAC,
    tasksReducer,
    TasksStateType, updateTaskAC
} from './tasks-reducer'
import {TaskStatuses, TodoTaskPriorities} from "../api/tasks-api";


export const startState: TasksStateType = {
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

test('correct task should be deleted from correct array', () => {


    const action = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
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
    })
})
test('correct task should be added to correct array', () => {

    // const action = addTaskAC('juce', 'todolistId2')
    const action = addTaskAC({
        todoListId: 'todolistId2',
        title: 'juce',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description:'',
        order: 0,
        priority: 0,
        startDate: '',
        id: 'asdgaga'
    })

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][3].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})
test('status of specified task should be changed', () => {

    const action = updateTaskAC('2', {
        title: 'milk',
        description: '',
        status: TaskStatuses.New,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadline: '',
    }, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
})
test('title of specified task should be changed', () => {

    const action = updateTaskAC('1', {
        title: 'salt',
        description: '',
        status: TaskStatuses.New,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadline: '',
    }, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].title).toBe('salt')
})
test('tasks should be added for todoList', () => {

    const action = SetTasksAC('todolistId1', startState['todolistId1'])

    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': []
    }, action)

    expect(endState['todolistId2'].length).toBe(0)
    expect(endState['todolistId1'].length).toBe(3)
})

