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

