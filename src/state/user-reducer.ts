export type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: String
    [key: string]: any
    newName?: string
}

export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {...state, age: state.age+1}
        case 'INCREMENT-CHILDREN-COUNT':
            return {...state, childrenCount: state.childrenCount+1}
        case 'CHANGE-NAME':
            return {...state, name: action.newName}
        default:
            throw new Error('I don\'t understand this type')
    }
}