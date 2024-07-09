const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');


// ADMIN LOGIN
const loginController = async (req, res) => {
    try {
        // const { role } = req.body;
        const user = await UserModel.findOne({ email: req.body.email });
        const rolecheck = await UserModel.findOne({ role: req.body.role });
        if (!user) {
            return res.send({
                success: false,
                message: "User not exists ",
            })
        }
        if (!rolecheck) {
            return res.send({
                success: false,
                message: "Role does not matched !",
            })
        }

        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if (!comparePassword) {
            return res.send({
                success: false,
                message: "Invalide Password ",
            })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.send({
            success: true,
            message: "Login SuccessFully !",
            token,
            user
        })
    } catch (error) {
        console.log(error)
        return res.send({
            success: false,
            message: "error in login controller",
            error
        })
    }
}
// ADMIN REGISTER
const registerController = async (req, res) => {
    try {
        const existingUser = await UserModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.send({
                success: false,
                message: "User already exists ",
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword

        const user = new UserModel(req.body);
        await user.save();

        return res.send({
            success: true,
            message: "User registration successfully !",
            user
        })
    } catch (error) {
        console.log(error)
        return res.send({
            success: false,
            message: "error in register controller",
            error
        })
    }
}


// get all user controller 
const alluserController = async (req, res) => {
    try {
        const alluser = await UserModel.find();
        res.send(alluser)
    } catch (error) {
        console.log(error)
    }
}

// delete user 
const deleteController = async (req, res)=>{
    try {
        const userId = req.params.id;
        const deletedUser = await UserModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.log(error)
    }
}

// update user
const updateController = async(req,res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;

        const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
module.exports = { registerController, loginController, alluserController, deleteController ,updateController}