const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on(
  "connection",
  async (socket: {
    emit(arg0: string, arg1: { name: string; surname: string }): unknown;
    on: (
      arg0: string,
      arg1: (
        arg1: any,
        arg2: any,
        callback: (arg0: { status: string }) => void
      ) => void
    ) => void;
  }) => {
    socket.on("myevent", (data) => {
      socket.emit("responseEvent", { name: "samuel", surname: "glamper" });
    });
  }
);

httpServer.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
