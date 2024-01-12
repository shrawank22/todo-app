import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import todoContext from '../context/todos/todoContext';
import { useContext } from 'react';

const Navbar = () => {
    const context = useContext(todoContext);
    const { showAlert } = context;
    
    let navigateTo = useNavigate();
    const handleLogout = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/logout", {
                withCredentials: "true"
            });
            // console.log(response);
            showAlert("success", response.data.message);
            localStorage.removeItem('token');
            navigateTo('/login')
        } catch (err) {
            console.log(err);
        }
    }

    let location = useLocation();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Todos App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about" ? "active": ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <form className='d-flex'>
                        <Link className={`btn btn-light mx-1 ${location.pathname==="/login"? "active": ""}`} to="/login">Login</Link>
                        <Link className={`btn btn-light mx-1 ${location.pathname==="/register" ? "active": ""}`} to="/register">Register</Link>
                    </form> :<div className='d-flex'>
                        {/* <a className='btn btn-info mx-2'>Signed in as {currentUser} </a> */}
                        <button className='btn btn-warning' onClick={handleLogout}>Logout</button>
                    </div>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
