const UserService = require('../services/userService');
const logger = require('../utils/logger');
const db = require('../config/firebase');

// Create a new user
const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUserRef = await db.collection('users').add(userData);
    res.status(201).json({ id: newUserRef.id, message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user', details: error.message });
  }
};

// Fetch all users
const getAllUsers = async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    if (snapshot.empty) {
      return res.status(404).json({ message: 'No users found' });
    }
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users', details: error.message });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;

    const userRef = db.collection('users').doc(userId);
    await userRef.update(userData);

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user', details: error.message });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await db.collection('users').doc(userId).delete();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user', details: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
