import express from "express";
import CategorySchema from "../schema/categorySchema.js";

const categoryRouter = express.Router();

categoryRouter.use((req, res, next) => {
  next();
});

categoryRouter.get("/", async (req, res) => {
  try {
    const category = await CategorySchema.find({});
    res.send(category);
  } catch (e) {
    res.status(400).send(e);
  }
});

categoryRouter.get("/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const categoryRes = await CategorySchema.findOne({ category });
    res.send(categoryRes || { category: "empty" });
  } catch (e) {
    res.status.send(e);
  }
});

categoryRouter.post("/addCategory", async (req, res) => {
  const { category } = req.body;
  const addCategory = new CategorySchema({
    category,
  });
  await addCategory
    .save()
    .then(() => {
      res.send("success");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

categoryRouter.delete("/deleteCategory", async (req, res) => {
  const { categoryId } = req.body;
  try {
    await CategorySchema.deleteOne({ _id: categoryId });
    res.send("success");
  } catch (e) {
    res.status(400).send(e);
  }
});

export default categoryRouter;
