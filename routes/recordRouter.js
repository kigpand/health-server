import express from "express";
import RecordSchema from "../schema/recordSchema.js";

const recordRouter = express.Router();

recordRouter.use((req, res, next) => {
  next();
});

recordRouter.get("/", async (req, res) => {
  const { days } = req.query;
  const allowedDayRanges = [3, 7, 10, 30];
  try {
    const filter = {};
    if (days) {
      const daysNumber = Number(days);
      if (!allowedDayRanges.includes(daysNumber)) {
        return res.status(400).send(`날짜 값이 잘못되었습니다`);
      }
      const startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      startDate.setDate(startDate.getDate() - daysNumber);
      filter.date = { $gte: startDate };
    }
    const routine = await RecordSchema.find(filter).sort({ date: -1 });
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

recordRouter.post("/reset", async (req, res) => {
  const { records = [] } = req.body;
  try {
    await RecordSchema.deleteMany({});
    if (records.length) {
      await RecordSchema.insertMany(
        records.map((record) => ({
          ...record,
          date: record.date ? new Date(record.date) : new Date(),
        }))
      );
    }
    res.send("reset success");
  } catch (e) {
    res.status(400).send(e);
  }
});

export default recordRouter;
