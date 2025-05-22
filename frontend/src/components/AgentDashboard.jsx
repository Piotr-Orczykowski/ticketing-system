import React, { useState, useEffect } from 'react';

export default function AgentDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch ("/api/tickets/agent", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ${localStorage.getItem("token")}'
      },
    })
    .then((res) => res.json())
    .then((data) => {
      setTickets(data);
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Agent Dashboard</h1>
      {loading ? (
        <p>Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <p>No tickets assigned to you.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Created  By</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id}>
                <td>{ticket._id}</td>
                <td>{ticket.createdBy?.username || "N/A"}</td>
                <td>{ticket.status}</td>
                <td>{new Date(ticket.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}