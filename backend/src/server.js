const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const connectDB = require('./config/db');
const { initSocket } = require('./socket/index.js');

const AuthRouter = require('./routes/Auth.Route.js');
const TaskRouter = require('./routes/task.Route.js');
const ActionRouter = require('./routes/Action.Route.js');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Collaborative Todo Board API');
});

// API Routes
app.use('/api/auth', AuthRouter);
app.use('/api/tasks', TaskRouter);
app.use('/api/logs', ActionRouter);

// Create server for Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// Start server
server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
