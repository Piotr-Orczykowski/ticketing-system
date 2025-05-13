// File: backend/controllers/authController.js
// This code defines the controller functions for user authentication and profile management.

const User = require('../models/User'); // Assuming you have a User model defined
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
            role
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully '});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    res.send("Login User");
}

exports.getUserProfile = async (req, res) => {
    res.send("Get User Profile");
}

exports.updateUserProfile = async (req, res) => {
    res.send("Update User Profile");
}

exports.deleteUser = async (req, res) => {
    res.send("Delete User");
}


