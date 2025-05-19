# Ticketing System

A full-stack ticket management system with role-based authentication built using the MERN stack (MongoDB, Express.js, React, Node.js).

## Project Structure

```
ticketing-system/
├── backend/           # Express.js server
│   ├── controllers/   # Route controllers
│   ├── models/       # Mongoose models
│   ├── routes/       # Express routes
│   └── server.js     # Server entry point
└── frontend/         # React application
    ├── src/
    │   ├── components/
    │   ├── api.js
    │   └── App.jsx
    └── index.html
```

## Features

- User authentication with JWT
- Role-based access control (Admin, Agent, Customer)
- Ticket management system
- Comment system for tickets
- Protected routes
- Role-specific dashboards

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing

### Frontend
- React
- React Router v6
- Axios
- Vite

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Piotr-Orczykowski/ticketing-system
cd ticketing-system
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:

Create `backend/.env`:
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

Create `frontend/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

4. Start the application:

```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get user profile (protected)

### Tickets
- POST `/api/tickets` - Create ticket
- GET `/api/tickets` - Get all tickets
- PUT `/api/tickets/:id` - Update ticket
- DELETE `/api/tickets/:id` - Delete ticket

### Comments
- POST `/api/tickets/:ticketId/comments` - Add comment
- GET `/api/tickets/:ticketId/comments` - Get comments
- PUT `/api/tickets/:ticketId/comments/:commentId` - Update comment
- DELETE `/api/tickets/:ticketId/comments/:commentId` - Delete comment

## User Roles (in progress)

### Admin
- Full system access
- Manage all tickets
- Manage users

### Agent
- View assigned tickets
- Update ticket status
- Add comments

### Customer
- Create tickets
- View own tickets
- Add comments to own tickets