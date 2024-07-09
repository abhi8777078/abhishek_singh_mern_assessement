const mongoose = require('mongoose');
const connectDB=async() => {
    try {
        await mongoose.connect('mongodb+srv://abhi8777078:abhi8777078@cluster0.lfphktx.mongodb.net/')
        console.log("Connected to DB ");
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;