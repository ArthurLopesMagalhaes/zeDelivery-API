import express, { ErrorRequestHandler } from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/api";
import { mongoConnect } from "./database/mongo";

dotenv.config();

mongoConnect();

const server = express();

server.use(cors());

server.use(express.static(path.join(__dirname, "../public")));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use("/", apiRoutes);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status);
  } else {
    res.status(400);
  }
  if (err.message) {
    res.json({ error: err.message });
  } else {
    res.json({ error: "Ocorreu algum erro." });
  }
};
server.use(errorHandler);

server.listen(process.env.PORT);
