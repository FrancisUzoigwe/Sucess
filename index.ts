import express from "express";
import { mainApp } from "./mainApp";

const app = express();
const port: number = 4300;
const realPort = port;


mainApp(app)
const Server = app.listen(realPort, () => {
  console.log("Server is live and running on port", realPort);
});

process.on("uncaughtException", (error) => {
  console.log("");
  console.log("Server is shutting down due to an uncaught exception", error);

  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.log("");
  console.log("Server is shutting down due to an unhandled rejection", reason);

  Server.close(() => {
    process.exit(1);
  });
});
