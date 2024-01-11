require('dotenv').config(); // dotenv config

// modules import--------
const express = require('express')
const expressSanitizer = require('express-sanitizer');
const cors = require('cors');
const app = express();

// App config-----
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(expressSanitizer())


// DB Connection-------
const connectMongo = require('./connect.js');
connectMongo();


// Routes import---------
const authRoutes = require('./routes/authRoutes.js');
const todoRoutes = require('./routes/todoRoutes.js')
app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);





app.listen(8080, () => {
    console.log("Server Started")
})