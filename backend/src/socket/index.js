// ---- socket.js (backend) ----
let io;
const onlineUsers = new Map();

function initSocket(server) {
  const { Server } = require('socket.io');
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
  });

  io.on('connection', (socket) => {
    console.log('🟢 Socket connected:', socket.id);

    socket.on('join', ({ id, name }) => {
      onlineUsers.set(socket.id, { id, name });
      io.emit('onlineUsers', Array.from(onlineUsers.values()));
    });

    socket.on('disconnect', () => {
      console.log('🔴 Socket disconnected:', socket.id);
      onlineUsers.delete(socket.id);
      io.emit('onlineUsers', Array.from(onlineUsers.values()));
    });
  });
}

function getIO() {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
}

module.exports = { initSocket, getIO };
