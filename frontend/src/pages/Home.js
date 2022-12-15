import { useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

//Components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            //Fetch workout data & store in response
            // Shortened from 'http://localhost:4000/api/workouts', using proxy in package.json
            const response = await fetch('/api/workouts')

            // Array of workout objects
            const json = await response.json()

            // If no error
            if(response.ok) {
                //payload is full array of workouts
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        fetchWorkouts()
    //Dependency array parameter, only fires once (avoid multiple calls) 
    // Dispatch is a dependency of useEffect as it's an external function
    }, [ dispatch ])

    return (
        <div className="home">
            <div className="workouts">
                {/* If workouts != null */}
               {workouts && workouts.map((workout) =>(
                    //Display WorkoutDetails for each workout, based on ID
                    // Pass workout to gain access to workout prop in component
                    <WorkoutDetails key={workout._id} workout={workout} />
               ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home