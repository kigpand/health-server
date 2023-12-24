import express from "express";
import path from "path";
import mongoose from "mongoose";

const __dirname = path.resolve();

const app = express();

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
  date: {
    type: Date,
    default: Date.now,
  },
});

const writing = mongoose.model("Writing", WritingSchema);

app.listen(3000, () => {
  console.log("Server is running");
});
