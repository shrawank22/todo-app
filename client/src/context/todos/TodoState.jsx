import TodoContext from "./todoContext";
import { useState } from "react";
import axios from 'axios'

const TodoState = ({ children }) => {
    const host = "http://localhost:8080"
 
    const [todos, setTodos] = useState([])

    const [alert, setAlert] = useState(null);

    function showAlert(type, message) {
        setAlert({
            type: type,
            msg: message
        });
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    };


    // Get all Todos
    const getTodos = async () => {
        // API Call 
        try {
            const response = await axios.get(`${host}/api/todos/`, {
                withCredentials: "true",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data) {
                setTodos(response.data)   
            }
        } catch (err) {
            console.error(err);
        }
    }

    // Add a Todo
    const addTodo = async (title, description, tag) => {
        try {
            // API Call 
            const response = await axios.post(`${host}/api/todos/`, { title, description, tag }, {
                withCredentials: "true",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const todo = response.data;
            setTodos(todos.concat(todo));

        } catch (err) {
            console.error(err);
        }
    }

    // Delete a Todo
    const deleteTodo = async (id) => {
        try {
            // API Call
            const response = await axios.delete(`${host}/api/todos/${id}`, {
                withCredentials: "true",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data)
            const newTodos = todos.filter((todo) => { return todo._id !== id })
            setTodos(newTodos)
        } catch (err) {
            console.error(err);
        }
    }

    // Edit a Todo
    const editTodo = async (id, title, description, tag) => {
        try {
            // API Call 
            const response = await axios.put(`${host}/api/todos/${id}`, {title, description, tag}, {
                withCredentials: "true",
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                }
            });

            // console.log(response.data)

            let newTodos = JSON.parse(JSON.stringify(todos))
            // Logic to edit in client
            for (let index = 0; index < newTodos.length; index++) {
                const element = newTodos[index];
                if (element._id === id) {
                    newTodos[index].title = title;
                    newTodos[index].description = description;
                    newTodos[index].tag = tag;
                    break;
                }
            }
            setTodos(newTodos);

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <TodoContext.Provider value={{ todos, addTodo, deleteTodo, editTodo, getTodos, alert, showAlert }}>
            {children}
        </TodoContext.Provider>
    )

}
export default TodoState;