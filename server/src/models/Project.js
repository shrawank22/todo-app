const mongoose = require('mongoose')
const {Schema, model} = mongoose;

const todoSchema = require('./Todo')

const projectSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    description: String,
    author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}, 
		username: String
	},
    todo: [todoSchema]
    }, { timestamps: true }
)

module.exports = model('Project', projectSchema);
