import React, { useContext } from 'react'
import todoContext from "../context/todos/todoContext"


const TodoItem = (props) => {
    const context = useContext(todoContext);
    const { deleteTodo } = context;
    const { todo, updateTodo, showTodo } = props;

    return (
        <div className="col-md-4">
            <div className="card my-3">
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    right: '0'
                }}>
                    <span className="badge bg-success p-1"> {todo.tag} </span>
                </div>
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{todo.title}</h5>
                        <i className="far fa-trash-alt mx-2 text-danger" onClick={() => { deleteTodo(todo._id); props.showAlert("Deleted Successfully", "success"); }}></i>
                        <i className="far fa-edit mx-2 text-warning" onClick={() => { updateTodo(todo) }}></i>
                    </div>
                    <p className="card-text">{todo.description.substring(0, 200)}...</p>

                    <button className="btn btn-sm btn-dark" onClick={() => showTodo(todo)} >Read More</button>
                </div>
            </div>
        </div>
    )
}

export default TodoItem