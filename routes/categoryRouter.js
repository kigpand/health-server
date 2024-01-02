import express from "express";
import CategorySchema from "../schema/categorySchema.js";

const categoryRouter = express.Router();

categoryRouter.use((req, res, next) => {
  next();
});

categoryRouter.get("/", async (req, res) => {
  const category = await CategorySchema.find({});
  res.send(category);
});

categoryRouter.get("/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const categoryRes = await RoutineSchema.findOne({ category });
    res.send(categoryRes);
  } catch (e) {
    console.error(e);
    res.send("fail");
  }
});

categoryRouter.post("/addCategory", async (req, res) => {
  const { category } = req.body;
  const addCategory = new CategorySchema({
    category,
  });
  const result = await addCategory
    .save()
    .then(() => {
      console.log("Success");
      res.send("success");
    })
    .catch((err) => {
      console.error(err);
      res.send("fail");
    });
});

categoryRouter.delete("/deleteCategory", async (req, res) => {
  const { category } = req.body;
  try {
    await CategorySchema.deleteOne({ category });
    res.send("success");
  } catch (e) {
    res.send("fail");
  }
});

export default categoryRouter;
