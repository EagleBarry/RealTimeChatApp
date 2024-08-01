import express from 'express';
import path from 'path';
import { Server, Socket } from 'socket.io';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const expressServer = app.listen(3500, () => {
  console.log('listening on 3500');
});

const io = new Server(expressServer, {
  cors: {
    origin:
      process.env['NODE_ENV'] === 'production'
        ? false
        : ['http://localhost:5500', 'http://127.0.0.1:5500'],
  },
});

io.on('connection', (socket: Socket) => {
  console.log(`User ${socket.id} connected`);

  socket.emit('message', 'Welcome to Chat App!');

  socket.broadcast.emit(
    'message',
    `User ${socket.id.substring(0, 5)} has connected`,
  );

  socket.on('message', (data: string) => {
    console.log(data);
    io.emit('message', `${socket.id.substring(0, 5)}: ${data}`);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit(
      'message',
      `User ${socket.id.substring(0, 5)} has disconnected`,
    );
  });

  socket.on('activity', (name: string) => {
    socket.broadcast.emit('activity', name);
  });
});
