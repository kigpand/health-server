import express from "express";
import RecordSchema from "../schema/recordSchema.js";

const recordRouter = express.Router();

recordRouter.use((req, res, next) => {
  next();
});

recordRouter.get("/", async (req, res) => {
  const routine = await RecordSchema.find({});
  res.send(routine);
});

recordRouter.get("/count/:count", async (req, res) => {
  const count = req.params.count;
  try {
    const routine = await RecordSchema.find({}).sort({ _id: -1 }).limit(count);
    res.send(routine);
  } catch (e) {
    res.send("fail");
  }
});

recordRouter.post("/addRecord", async (req, res) => {
  const { title, id, category } = req.body;
  const addRecord = new RecordSchema({
    title,
    id,
    category,
  });
  const result = await addRecord
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

export default recordRouter;
