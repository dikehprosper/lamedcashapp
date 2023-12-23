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
    on(
      arg0: string,
      arg1: (arg1: any, arg2: any, callback: any) => void
    ): unknown;
    emit: any;
    id: any
  }) => {
    socket.on("myevent", (arg1, arg2, callback) => {
    //   console.log(socket.id);
    //   socket.emit("responseEvent", { name: "samuel", surname: "glamper" });

      callback({ status: "ok" });
    });
  }
);

httpServer.listen(5001, () => {
  console.log("Server is listening to the port 5001");
});
