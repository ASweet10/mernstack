
const express = require("express")
const {
    getWorkout, getWorkouts, createWorkout, updateWorkout, deleteWorkout
} = require('../controllers/workoutController')

const router = express.Router() //Get access to express router

// GET all workouts (zzz/api/workouts/)
router.get('/', getWorkouts)

// GET single workout 
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

module.exports = router