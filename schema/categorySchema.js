import mongoose from "mongoose";

const { Schema } = mongoose;

const Category = new Schema({
  category: String,
});

const CategorySchema = mongoose.model("Category", Category);

export default CategorySchema;
