import express from "express";
import RoutineSchema from "../schema/routineSchema.js";

const routineRouter = express.Router();

routineRouter.use((req, res, next) => {
  next();
});

routineRouter.get("/", async (req, res) => {
  const routine = await RoutineSchema.find({});
  res.send(routine);
});

routineRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const routine = await RoutineSchema.findOne({ id });
    res.send(routine);
  } catch (e) {
    console.error(e);
    res.send("fail");
  }
});

routineRouter.post("/addRoutine", async (req, res) => {
  const { id, title, category, routine } = req.body;
  const addRoutine = new RoutineSchema({
    id,
    title,
    category,
    routine: [...routine],
  });
  const result = await addRoutine
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

routineRouter.put("/updateRoutine", async (req, res) => {
  const { id, title, category, routine } = req.body;
  try {
    await RoutineSchema.updateOne({ id: id }, { title, category, routine });
    res.send("success");
  } catch (e) {
    res.send("fail");
  }
});

routineRouter.delete("/delete", async (req, res) => {
  const { id } = req.body;
  try {
    await RoutineSchema.deleteOne({ id });
    res.send("success");
  } catch (e) {
    res.send("fail");
  }
});

routineRouter.delete("/deleteRoutineByCategory", async (req, res) => {
  const { category } = req.body;
  try {
    await RoutineSchema.deleteMany({ category });
    res.send("success");
  } catch (e) {
    res.send("fail");
  }
});

export default routineRouter;
