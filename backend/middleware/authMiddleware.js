// middleware.js
// This middleware function simulates user authentication by adding a user object to the request.

const authMiddleware = (req, res, next) => {
  console.log('Auth middleware triggered');
  req.user = { id: 'placeholderUserId', role: 'agent' }; // Simulated user
  next();
};

module.exports = authMiddleware;