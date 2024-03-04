const express = require('express');
const router = express.Router();
const middleware = require('../../middleware');
const Project = require('../models/Project');


//--------------------Project APIs---------------------------
// Get all projects (done checking)
router.get('/projects', middleware.isLoggedIn, async (req, res) => {
    try {
        const projects = await Project.find({ 'author.id': req.user._id }, { todo: 0 });
        if (!projects) return res.status(404).send("No Projects Found")
        return res.send(projects)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Get a project with id (done checking)
router.get('/projects/:id', middleware.checkProjectOwnership, async (req, res) => {
    try {
        const data = await Project.findById(req.params.id).sort({ order: 1 });
        return res.send(data);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// Add a project (done checking)
router.post('/projects', middleware.isLoggedIn, async (req, res) => {
    try {
        let { title, description } = req.body;
        title = req.sanitize(title);
        description = req.sanitize(description);

        const author = { id: req.user._id, username: req.user.username };

        const project = await Project.create({ title, description, author });
        return res.send(project);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Update a project (done checking)
router.put('/projects/:id', middleware.checkProjectOwnership, async (req, res) => {
    const { title, description } = req.body;
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
        return res.json(project);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Delete a project (done checking)
router.delete('/projects/:id', middleware.checkProjectOwnership, async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).send('Project not found!')
        }
        res.status(200).send("Project Deleted Successfully")
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
})

// Add a todo to project (done checking)
router.post('/projects/:id/todos', middleware.checkProjectOwnership, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        console.log(project);
        let { title, description } = req.body;
        title = req.sanitize(title);
        description = req.sanitize(description);

        let countTodoLength = [project.todo.length, project.todo.length > 0 ? Math.max(...project.todo.map(o => o.index)) : project.todo.length];
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, { $push: { todo: { title, description, stage: "Requested", order: countTodoLength[0], index: countTodoLength[1] + 1 } } }, { new: true });

        return res.send(updatedProject);
    } catch (err) {
        return res.status(500).send(err);
    }
});

// Get a particular todo item on particular project (done)
router.get('/projects/:id/todos/:todosId', middleware.checkProjectOwnership, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).send({ error: true, message: 'Project not found' });

        const todo = project.todo.id(req.params.todosId);
        if (!todo) return res.status(404).send({ error: true, message: 'todo not found' });

        return res.send(todo);
    } catch (error) {
        return res.status(500).send(error);
    }
});

// update a particular todo item on particular project (done)
router.put('/projects/:id/todos/:todosId', async (req, res) => {
    let { title, description } = req.body;
    title = req.sanitize(title);
    description = req.sanitize(description);

    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).send({ error: true, message: 'Project not found' });

        const todo = project.todo.id(req.params.todosId);
        if (!todo) return res.status(404).send({ error: true, message: 'Todo not found' });

        todo.title = title;
        todo.description = description;

        await project.save();
        return res.send(project);
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Delete a particular todo item on particular project (done)
router.delete('/projects/:id/todos/:todosId', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).send({ error: true, message: 'Project not found' });

        const todo = project.todo.id(req.params.todosId);
        if (!todo) return res.status(404).send({ error: true, message: 'Task not found' });

        project.todo.pull(todo._id);
        await project.save();

        return res.send(project);
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router