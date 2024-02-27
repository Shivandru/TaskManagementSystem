const express = require("express");
const swaggerJSdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { Server } = require("socket.io");
const { createServer } = require("http");
const { connection } = require("./Database/db");
const { userRouter } = require("./Controllers/user.routes");
const { taskRouter } = require("./Controllers/tasks.router");
const Port = process.env.PORT;
const app = express();
const server = createServer(app);
app.use(express.json());
// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Task Management System",
//       version: "1.0.0",
//     },
//     servers: [
//       {
//         url: "http://localhost:3000",
//       },
//     ],
//   },
//   apis: ["./Controllers/*.js"],
// };
// const swaggerSpec = swaggerJSdoc(options);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cookieParser());
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
    httpOnly: true,
  })
);
app.use("/user", userRouter);
app.use("/task", taskRouter);
app.get("/", (req, res) => {
  res.status(200).send(`<h2>Welcome to my Task Management System...</h2>`);
});

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    credentials: true,
    httpOnly: true,
  },
});

io.on("connection", (socket) => {
  console.log("New User connected with socket id: " + socket.id);

  socket.on("disconnect", () => {
    console.log(`user disconnected ${socket.id}`);
  });
});
server.listen(Port, async () => {
  try {
    await connection;
    console.log(`server is running on port ${Port} and Mongo Connected...`);
  } catch (error) {
    console.log(error);
  }
});
