const express = require('express');
const router = express.Router();
const middleware = require('../../middleware');
const Todo = require('../models/Todo');


// Get Route /api/todos -> Login required
router.get('/todos', middleware.isLoggedIn, async (req, res) => {
    try {
        const todos = await Todo.find({ 'author.id':req.user._id });
        // console.log(todos);
        if (!todos) return res.status(404).send("No Todo Found")
        res.json(todos)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
 
// Add Todo Route /api/todos
router.post('/todos', middleware.isLoggedIn, async (req, res) => {
        try {
            let { title, description, tag } = req.body;
            title = req.sanitize(title);
            description = req.sanitize(description);
            tag = req.sanitize(tag);
            
            const author = {id: req.user._id, username: req.user.username};

            const todo = await Todo.create({title, description, tag, author});
            res.send(todo);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// Update a Todo Route "/api/todos/:id" -> Todo Ownership required
router.put('/todos/:id', middleware.checkTodoOwnership, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, {title, description, tag});
        res.json(todo);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Delete Todo Route "/api/todos/:id"
router.delete('/todos/:id', middleware.isLoggedIn, async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).send('Todo not found!')
        }
        res.status(200).send("Todo Deleted Successfully")
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
})
module.exports = router