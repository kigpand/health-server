import express from "express";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

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

// mongoose set
const { Schema } = mongoose;

const WritingSchema = new Schema({
  id: Number,
  title: String,
  category: String,
  routine: [
    {
      kg: Number,
      set: Number,
      title: String,
    },
  ],
});
const Writing = mongoose.model("Writing", WritingSchema);

app.get("/", async (req, res) => {
  let writing = await Writing.find({});
  console.log(writing);
  res.send(writing[writing.length - 1]);
});

app.post("/addRoutine", async (req, res) => {
  const { id, title, category, routine } = req.body;
  const writing = new Writing({
    id,
    title,
    category,
    routine: [...routine],
  });
  const result = await writing
    .save()
    .then(() => {
      console.log("Success");
      res.render("success");
    })
    .catch((err) => {
      console.error(err);
      res.render("fail");
    });
});

app.listen(3010, () => {
  console.log("Server is running");
});
