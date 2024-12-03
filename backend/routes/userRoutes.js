const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// CRUD routes for user
router.post('/users', UserController.createUser); // Add new user
router.get('/users', UserController.getAllUsers); // Get all users
router.put('/users/:id', UserController.updateUser); // Update user by ID
router.delete('/users/:id', UserController.deleteUser); // Delete user by ID

module.exports = router;
