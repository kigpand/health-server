import express from "express";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import routineRouter from "./routes/routineRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import recordRouter from "./routes/recordRouter.js";

const __dirname = path.resolve();

const app = express();

// CORS 설정 - 모두 개방
app.use(
  cors({
    // origin: ["http://localhost:5173"],
    origin: true,
    credentials: true,
  })
);

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mongoose connect
mongoose
  .connect("mongodb://0.0.0.0:27017")
  .then(() => console.log("DB 연결 성공"))
  .catch((e) => console.log(e));

// app router
app.use("/routine", routineRouter);
app.use("/category", categoryRouter);
app.use("/record", recordRouter);

app.get("/test", (req, res) => {
  res.send("테스트입니다");
});

app.listen(3010, () => {
  console.log("Server is running");
});
