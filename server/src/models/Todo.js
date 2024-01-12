const mongoose = require('mongoose')

const {Schema, model} = mongoose;

const todoSchema = new Schema({
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
    author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}, 
		username: String
	},
    date: {
        type: Date, 
        default: Date.now
    }
});

module.exports = model("Todo", todoSchema)