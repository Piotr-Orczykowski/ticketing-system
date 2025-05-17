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
   try {
        const { commentId } = req.params;
        const { text } = req.body;
        const userId = req.user.id;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        if (comment.userId.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorised to update this comment' });
        }

        comment.text = text;
        await comment.save();
        res.json({
            message: 'Comment updated successfully',
            comment
        });
   } catch (error) {
        res.status(500).json({ message: error.message });
   }
};

exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        if (comment.userId.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorised to delete this comment' });
        }

        await comment.deleteOne();
        res.json({
            message: 'Comment deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}