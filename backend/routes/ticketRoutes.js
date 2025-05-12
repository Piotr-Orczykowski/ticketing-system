const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const authMiddleware = require('../middleware/authMiddleware');
const { createTicket, getTickets, updateTicket, deleteTicket } = require('../controllers/ticketController');

// Ticket Routes
router.post('/create', authMiddleware, createTicket);
router.get('/get', authMiddleware, getTickets);
router.put('/update/:ticketId', authMiddleware, updateTicket);
router.delete('/delete/:ticketId', authMiddleware, deleteTicket);

module.exports = router;