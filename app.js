import express from "express";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import routineRouter from "./routes/routineRouter.js";

const __dirname = path.resolve();

const app = express();

// CORS 설정 - 모두 개방
app.use(cors());

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mongoose connect
mongoose
  .connect("mongodb://127.0.0.1:27017")
  .then(() => console.log("DB 연결 성공"))
  .catch((e) => console.log(e));

// app router
app.use("/routine", routineRouter);

app.listen(3010, () => {
  console.log("Server is running");
});
