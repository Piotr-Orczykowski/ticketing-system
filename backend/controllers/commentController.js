// File: backend/controllers/authController.js
// This code defines the controller functions for user authentication and profile management.
const Ticket = require('../models/Ticket');
const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
    try {
        const { text } = req.body;
        const ticketId = req.params.ticketIdl; // Assuming ticketId is passed as a URL parameter
        const userId = req.user.id;

        const ticket =  await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const newComment = new Comment({
            ticketId,
            userId,
            text
        });
        await newComment.save();
        res.status(201).json({
            message: 'Comment added successfully',
            comment: newComment
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getComments = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;
        const comments = await Comment.find({ ticketId }).populate('userId', 'username email');
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateComment = async (req, res) => {
    res.send("Update Comment");
};

exports.deleteComment = async (req, res) => {
    res.send("Delete Comment");
}