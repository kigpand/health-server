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

recordRouter.post("/addRecord", async (req, res) => {
  const { title, date, category } = req.body;
  const addRecord = new RecordSchema({
    title,
    date,
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
