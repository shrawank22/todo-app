import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import todoContext from '../context/todos/todoContext'


const Login = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" })

    const context = useContext(todoContext);
    const {showAlert} = context;

    let navigateTo = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = credentials;
        try {
            const response = await axios.post("http://localhost:8080/api/login", { username, password }, {
                withCredentials: "true",
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            // console.log(response)

            localStorage.setItem('token', response.data.authtoken);
            showAlert("success", "Logged in Successfully!");
            navigateTo("/");


        } catch (err) {
            // console.log(err);
            showAlert("danger", "Invalid Credentials");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (

        <form className='mt-4' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" value={credentials.username} onChange={onChange} id="username" name="username" aria-describedby="usernameHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Login
