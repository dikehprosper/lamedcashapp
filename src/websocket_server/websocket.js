const { createServer } = require("http")
const { Server } = require("socket.io")

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on("connection", async (socket) => {
    socket.on("myevent", (data) => {
        socket.emit("responseEvent", { name : "samele", surname: "vdfvr"})
    })
})

httpServer.listen(5000, () => {
    console.log("server is running on 5000")
})

