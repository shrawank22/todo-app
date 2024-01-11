import {useState} from 'react'
import { useNavigate } from 'react-router'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigateTo = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password, cpassword} = credentials;
        const response = await fetch("http://localhost:8080/api/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        // console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Account Created Successfully!", "success");
            navigateTo("/");

        }
        else {
            props.showAlert(json.error, "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <form className='mt-5' onSubmit={handleSubmit}>
             <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" aria-describedby="nameHelp" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" required/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" required minLength={6}/>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword" required minLength={6}/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Signup
