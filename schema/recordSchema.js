import mongoose from "mongoose";

const { Schema } = mongoose;

const Record = new Schema({
  title: String,
  category: String,
  date: Date,
});

const RecordSchema = mongoose.model("Record", Record);

export default RecordSchema;
