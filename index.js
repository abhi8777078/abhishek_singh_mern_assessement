const express = require('express');
const connectDB = require('./config/User');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const dotenv = require('dotenv');
// config();
dotenv.config();

connectDB();

const PORT = 8080;
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// authentication 
app.use('/api/v1/auth',require("./Routes/auth"))

app.listen(PORT, () => {
    console.log("Node is Running ")
})