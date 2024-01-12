import React, {useContext, useState} from 'react'
import todoContext from "../context/todos/todoContext"

const AddTodo = () => {
    const context = useContext(todoContext);
    const {addTodo, showAlert} = context;

    const [todo, setTodo] = useState({title: "", description: "", tag: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addTodo(todo.title, todo.description, todo.tag);
        setTodo({title: "", description: "", tag: ""});
        showAlert("success", "Added Successfully");
    }

    const onChange = (e)=>{
        setTodo({...todo, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add a Todo</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={todo.title} onChange={onChange} minLength={3} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea type="text" className="form-control" id="description" name="description" rows={8} value={todo.description} onChange={onChange} minLength={5} required ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={todo.tag} onChange={onChange} required/>
                </div>
               
                <button disabled={todo.title.length<3 || todo.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Todo</button>
            </form>
        </div>
    )
}

export default AddTodo