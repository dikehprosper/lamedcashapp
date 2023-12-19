const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket: { id: any }) => {
  console.log(socket.id);
});

httpServer.listen(5001, () => {
  console.log("Server is listening to the port 5001");
});
