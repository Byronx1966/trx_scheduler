const express = require("express");
const http = require("http");
const log4js = require("log4js");
const socketIO = require("socket.io");
const path = require("path");

const logRoutes = require('./routes/log');
const taskRoutes = require('./routes/tasks');

// 配置 log4js
log4js.configure("./backend/config/log4js-config.json");
const logger = log4js.getLogger();

// 初始化 Express 服务器
const app = express();
app.use(express.json());
app.use('/logs', logRoutes);
app.use('/tasks', taskRoutes);

// 创建 HTTP 服务器和 Socket.IO 服务器
const server = http.createServer(app);
const io = socketIO(server);


// 为了方便起见，我们将前端页面直接托管在同一个服务器上
app.use(express.static(path.join(__dirname, "../frontend")));

// 启动服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

