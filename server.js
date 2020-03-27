const app = require("express")();
const http = require("http").createServer(app);
const util = require("./util");
const io = require("socket.io")(http);
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
})

io.on('connection', (socket) => {
    console.log("user connected");
    socket.on('disconnect', () => {
        console.log("user disconnected");
    });
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg);
    });
});

http.listen(util.PORT, util.HOST, () => {
    console.log("server started at " + `${util.PORT}`);
})