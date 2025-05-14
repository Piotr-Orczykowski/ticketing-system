// This code defines the routes for user authentication and profile management in an Express.js application.
// It includes routes for user registration, login, fetching user profile, updating profile, and deleting a user.
// The routes are protected by an authentication middleware to ensure that only authenticated users can access certain endpoints.

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getUserProfile', authMiddleware, getUserProfile);
router.put('/updateUserProfile', authMiddleware, updateUserProfile);
router.delete('/deleteUser', authMiddleware, deleteUser);

module.exports = router;