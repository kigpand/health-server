import mongoose from "mongoose";

const { Schema } = mongoose;

const Routine = new Schema({
  id: Number,
  title: String,
  category: String,
  date: Date,
  routine: [
    {
      kg: Number,
      set: Number,
      title: String,
      link: String,
    },
  ],
});

const RoutineSchema = mongoose.model("Routine", Routine);

export default RoutineSchema;
