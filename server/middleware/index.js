const middlewareObj = {};
const Todo = require('../src/models/Todo')


middlewareObj.checkTodoOwnership = async(req, res, next) => {
	if(req.isAuthenticated()){
        try {
		    const todo = await Todo.findById(req.params.id);
            // console.log(todo);
            if (todo.author.id.equals(req.user._id)) {
                return next();
            } else {
                return res.status(401).send("You need to be logged in to do that!");
            }
        } catch(err) {
            return res.status(404).send(err)
        }
	} else {
        return res.status(401).send("You need to be logged in to do that!");
	}
}


middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.status(401).send("You need to be logged in to do that!");
}

module.exports = middlewareObj;