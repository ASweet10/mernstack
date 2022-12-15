import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

//Previous state, action to take
export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                //Payload is array of workouts
                // -Passed into "dispatch" in WorkoutsContextProvider
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                //-Pass new workout into array
                //-Use spread (...) operator to copy existing array into new array
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                //Use filter to keep all workouts that don't have given (deleted) id
                workouts: state.workouts.filter((workout) => workout._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })

    return (
        //Wrap all components so they have access to context
        <WorkoutsContext.Provider value={{ ...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}