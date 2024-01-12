import './App.css'
import { useState } from 'react';
import Home from './components/Home'
import Navbar from './components/Navbar'
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoState from './context/todos/TodoState';

const App = () => {
  return (
    <TodoState>
      <Router >
        <Navbar />
        <Alert />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Signup />} />
          </Routes>
        </div>
      </Router >
    </TodoState>
  );
}


export default App
