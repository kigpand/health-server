import mongoose from "mongoose";

const { Schema } = mongoose;

const Record = new Schema({
  title: String,
  category: String,
  id: Number,
});

const RecordSchema = mongoose.model("Record", Record);

export default RecordSchema;
