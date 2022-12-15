import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()
    const [title, setTitle] = useState('') //Default to empty string
    const [weight, setWeight] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (event) => {
        event.preventDefault()   //Prevent default action (page refresh)

        const workout = {title, weight, reps}
        
        //Fetch request to post new data
        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout), //Turn workout object into json string
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(json.error) {
            //Return error property from error code 400 json in workoutController
            setError(json.error)
            //Set all empty fields returned from server
            setEmptyFields(json.emptyFields)
        }

        if(response.ok) {
            setEmptyFields([])
            //Reset to default strings
            setTitle('')
            setWeight('')
            setReps('')
            setError(null) //Set error null in case there was one previously
            console.log('new workout added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>

            <label>Exercise Title</label>
            {/* Fire event on click, set equal to input's value */}
            <input 
                type="text"
                onChange={(event) => setTitle(event.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Weight (lbs)</label>
            <input 
                type="number"
                onChange={(event) => setWeight(event.target.value)}
                value={weight}
                className={emptyFields.includes('weight') ? 'error' : ''}
            />

            <label>Reps</label>
            <input 
                type="number"
                onChange={(event) => setReps(event.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button className="material-symbols-outlined">Add</button>
            {/*If error exists, create error div */}
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm