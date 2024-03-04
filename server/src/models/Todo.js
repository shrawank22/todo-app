const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
    id: Number,
    title: String,
    description: String,
    order: Number,
    stage: String,
    index: Number,
    attachment: [
        { type: String, url: String }
    ]
}, { timestamps: true });

module.exports = todoSchema;