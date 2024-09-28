import express from "express";
import RecordSchema from "../schema/recordSchema.js";

const recordRouter = express.Router();

recordRouter.use((req, res, next) => {
  next();
});

recordRouter.get("/", async (req, res) => {
  const routine = await RecordSchema.find({});
  try {
    res.send(routine);
  } catch (e) {
    res.status(400).send(e);
  }
});

recordRouter.get("/count/:count", async (req, res) => {
  const count = req.params.count;
  try {
    const routine = await RecordSchema.find({}).sort({ _id: -1 }).limit(count);
    res.send(routine);
  } catch (e) {
    res.status(400).send(e);
  }
});

recordRouter.post("/addRecord", async (req, res) => {
  const { title, id, category } = req.body;
  const date = new Date();
  const addRecord = new RecordSchema({
    title,
    id,
    category,
    date,
  });
  await addRecord
    .save()
    .then(() => {
      res.send("success");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

recordRouter.delete("/deleteAll", async (req, res) => {
  try {
    await RecordSchema.deleteMany({});
    res.send("success");
  } catch (e) {
    res.status(400).send(e);
  }
});

export default recordRouter;
