import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import cors from 'cors';
import {
  connect,
  createExercise,
  getAllExercises,
  getExerciseById,
  updateExerciseById,
  deleteExerciseById
} from './exercises_model.mjs';

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

import cors from 'cors';

const allowedOrigins = [
  'https://mern-exercise-tracker-5bmk61n4n-emmanuel-murillos-projects.vercel.app',
  'https://mern-exercise-tracker-nbbsjklww-emmanuel-murillos-projects.vercel.app',
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman / non-browser
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

function isDateValid(date) {
  const format = /^\d\d-\d\d-\d\d$/;
  return format.test(date);
}

function validateRequest(body) {
  const { name, reps, weight, unit, date } = body;
  const keys = Object.keys(body);

  if (
    keys.length !== 5 ||
    !keys.includes("name") ||
    !keys.includes("reps") ||
    !keys.includes("weight") ||
    !keys.includes("unit") ||
    !keys.includes("date")
  ) return false;

  if (
    typeof name !== "string" || name.trim().length === 0 ||
    !Number.isInteger(reps) || reps <= 0 ||
    !Number.isInteger(weight) || weight <= 0 ||
    !(unit === "kgs" || unit === "lbs") ||
    !isDateValid(date)
  ) return false;

  return true;
}

app.post('/exercises', asyncHandler(async (req, res) => {
  if (!validateRequest(req.body)) return res.status(400).json({ Error: "Invalid request" });
  const newExercise = await createExercise(req.body);
  res.status(201).json(newExercise);
}));

app.get('/exercises', asyncHandler(async (req, res) => {
  const allExercises = await getAllExercises();
  res.status(200).json(allExercises);
}));

app.get('/exercises/:_id', asyncHandler(async (req, res) => {
  const doc = await getExerciseById(req.params._id);
  if (!doc) return res.status(404).json({ Error: "Not found" });
  res.status(200).json(doc);
}));

app.put('/exercises/:_id', asyncHandler(async (req, res) => {
  if (!validateRequest(req.body)) return res.status(400).json({ Error: "Invalid request" });
  const updated = await updateExerciseById(req.params._id, req.body);
  if (!updated) return res.status(404).json({ Error: "Not found" });
  res.status(200).json(updated);
}));

app.delete('/exercises/:id', asyncHandler(async (req, res) => {
  console.log('Deleting exercise with ID:', req.params.id);
  const deleted = await deleteExerciseById(req.params.id);
  if (!deleted) return res.status(404).json({ Error: "Not found" });
  res.sendStatus(204);
}));

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}...`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err);
  });