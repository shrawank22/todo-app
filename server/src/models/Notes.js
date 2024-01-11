const mongoose = require('mongoose')

const {Schema, model} = mongoose;

const notesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date, 
        default: Date.now
    }
});

module.exports = model("Notes", notesSchema)