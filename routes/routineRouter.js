import express from "express";
import RoutineSchema from "../schema/routineSchema.js";

const routineRouter = express.Router();

routineRouter.use((req, res, next) => {
  next();
});

routineRouter.get("/", async (req, res) => {
  try {
    const routine = await RoutineSchema.find({});
    res.send(routine);
  } catch (e) {
    res.status(400).send(e);
  }
});

routineRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const routine = await RoutineSchema.findOne({ id });
    res.send(routine);
  } catch (e) {
    res.status(400).send(e);
  }
});

routineRouter.get("/category/:category", async (req, res) => {
  const category = req.params.category;
  try {
    const routine = await RoutineSchema.find({ category });
    res.send(routine);
  } catch (e) {
    res.status(400).send(e);
  }
});

routineRouter.get("/count/:count", async (req, res) => {
  const count = req.params.count;
  try {
    const routine = await RoutineSchema.find({}).limit(count);
    res.send(routine);
  } catch (e) {
    res.status(400).send(e);
  }
});

routineRouter.post("/addRoutine", async (req, res) => {
  const { id, title, category, routine } = req.body;
  const date = new Date();
  const addRoutine = new RoutineSchema({
    id,
    title,
    category,
    date,
    routine: [...routine],
  });
  await addRoutine
    .save()
    .then(() => {
      res.send("success");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

routineRouter.put("/updateRoutine", async (req, res) => {
  const { id, title, category, routine } = req.body;
  try {
    await RoutineSchema.updateOne({ id: id }, { title, category, routine });
    res.send("success");
  } catch (e) {
    res.status(400).send(e);
  }
});

routineRouter.delete("/delete", async (req, res) => {
  const { id } = req.body;
  try {
    await RoutineSchema.deleteOne({ id });
    res.send("success");
  } catch (e) {
    res.status(400).send(e);
  }
});

routineRouter.delete("/deleteRoutineByCategory", async (req, res) => {
  const { category } = req.body;
  try {
    await RoutineSchema.deleteMany({ category });
    res.send("success");
  } catch (e) {
    res.status(400).send(e);
  }
});

export default routineRouter;
