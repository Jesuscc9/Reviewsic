const express = require("express");
const session = require('express-session');
const http = require("http");
const cors = require('cors')
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(cors())
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
  getApiAndEmit(socket);
  console.log("New client connected " + socket.id);
  socket.on("disconnect", (socket) => {
    console.log("Disconnected " + socket.id);
  });
});

const getApiAndEmit = socket => {
  socket.emit("FromAPI", {
    hola: 'saludos',
    gf: 'clairo',
  });
};

server.listen(port, () => console.log(`Listening on port ${port}`));