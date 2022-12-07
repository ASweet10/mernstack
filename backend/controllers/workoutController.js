const Workout = require("../models/workoutModel")
const mongoose = require("mongoose")

// GET all workouts
const getWorkouts = async (req, res) => {
    //Get all documents, leave find blank
    // Sort so newest are at top
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}


// GET single workout
const getWorkout = async (req, res) => {
    // Get ID property from route
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no such workout ID"})
    }

    const workout = await Workout.findById(id)

    //If not found...
    if (!workout) {
        return res.status(404).json({error: "workout not found"})
    }

    res.status(200).json(workout)
}


// CREATE new workout
const createWorkout = async (req, res) => {
    const {title, reps, weight} = req.body

    try{
        //Store Workout.create response in workout
        // Create document with {} properties
        const workout = await Workout.create({title, reps, weight})
        
        //Send workout json object
        res.status(200).json(workout)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}


// DELETE a workout
const deleteWorkout = async (req, res) => {
    // Get ID property from route
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no such workout ID"})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    //If not found...
    if (!workout) {
        return res.status(404).json({error: "workout not found"})
    }

    res.status(200).json(workout)
}


// UPDATE a workout
const updateWorkout = async (req, res) => {
    // Get ID property from route
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no such workout ID"})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        //Could also pass / update a single property,
        // i.e.: title: 'abc'
        ...req.body
    })
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}