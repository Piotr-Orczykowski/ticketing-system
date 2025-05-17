// File: backend/controllers/ticketController.js
// This code defines the controller functions for ticket management
const Ticket = require('../models/Ticket');


exports.createTicket = async (req, res) => {
    try {
        const { title, description, priority, status } = req.body;
        const ticket = new Ticket({
            title,
            description,
            priority,
            status,
            userId: req.user.id // Assuming userId is available in req.user
        });
        await ticket.save();
        res.status(201).json({
            message: 'Ticket created successfully',
            ticket
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().populate('assignedTo createdBy', 'username email');
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateTicket = async (req, res) => {
    req.send("Update Ticket");
}

exports.deleteTicket = async (req, res) => {
    req.send("Delete Ticket");
}

