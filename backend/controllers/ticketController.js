// File: backend/controllers/ticketController.js
// This code defines the controller functions for ticket management

exports.createTicket = async (req, res) => {
    req.send("Create Ticket");
}

exports.getTickets = async (req, res) => {
    req.send("Get Tickets");
}

exports.updateTicket = async (req, res) => {
    req.send("Update Ticket");
}

exports.deleteTicket = async (req, res) => {
    req.send("Delete Ticket");
}

