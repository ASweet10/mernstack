const mongoose = require("mongoose")

const Schema = mongoose.Schema

// Schema defines document structure
const workoutSchema = new Schema ({
    title : {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    }
}, {timestamps: true})

// Model applies schema, then use model to interact with collection
// Export (Workout) module, then call functions [i.e. Workout.find()]
module.exports = mongoose.model("Workout", workoutSchema)