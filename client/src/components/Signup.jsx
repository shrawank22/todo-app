import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import todoContext from '../context/todos/todoContext'
import axios from 'axios'


const Signup = () => {
    const [credentials, setCredentials] = useState({ username: "", name: "", email: "", password: "" })
    let navigateTo = useNavigate();

    const context = useContext(todoContext);
    const { showAlert } = context;

    const handleSubmit = async (e) => {
        e.preventDefault();
  
        try {
            const { username, name, email, password } = credentials;
            const response = await axios.post("http://localhost:8080/api/register", { username, name, email, password }, {
                withCredentials: "true",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // console.log(response.data);
            localStorage.setItem('token', response.data.authtoken);
            showAlert("success", "Account Created Successfully!", );
            navigateTo("/");
        } catch (err) {
            // console.log(err.response);
            showAlert("danger", err.response.data);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <form className='mt-5' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" aria-describedby="nameHelp" required />
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" required />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>

            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" value={credentials.username} onChange={onChange} name="username" id="username" required />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" required minLength={6} />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Signup
