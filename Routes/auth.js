const express = require('express');
const { registerController, loginController, alluserController, deleteController, updateController } = require('../Controller/authController');
const router = express.Router();
// Register || POST
router.post('/register', registerController)

// Login ||POST
router.post('/login', loginController)

// GET ALL USER
router.get('/alluser', alluserController);

// UPDATE
router.put('/data/:id',updateController)

//DELETE
router.delete('/delete/:id', deleteController);

module.exports = router;