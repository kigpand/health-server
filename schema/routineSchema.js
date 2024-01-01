import mongoose from "mongoose";

const { Schema } = mongoose;

const Routine = new Schema({
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

const RoutineSchema = mongoose.model("Routine", Routine);

export default RoutineSchema;
