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
    try {
        const { ticketId } = req.params;
        const updates = req.body;
        const ticket = await Ticket.findByIdAndUpdate(ticketId, updates, { new: true });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json({
            message: 'Ticket updated successfully',
            ticket
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteTicket = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const ticket = await Ticket.findByIdAndDelete(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json({
            message: 'Ticket deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

