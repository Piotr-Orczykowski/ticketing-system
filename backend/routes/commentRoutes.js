// This code defines the routes for managing comments on tickets.  
// It includes routes for adding a comment, getting comments for a ticket, updating a comment, and deleting a comment.

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Ticket = require('../models/Ticket');
const Comment = require('../models/Comment');
const { addComment, getComments, updateComment, deleteComment } = require('../controllers/commentController');

router.post('/add', addComment);
router.get('/get/:ticketId', getComments);
router.put('/update/:commentId', updateComment);
router.delete('/delete/:commentId', deleteComment);

module.exports = router;
