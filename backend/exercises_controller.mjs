import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import cors from 'cors';
import { auth } from 'express-oauth2-jwt-bearer'; 

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

const allowedOrigins = [
  "https://mern-exercise-tracker-topaz.vercel.app",
  "http://localhost:5173",
];
const vercelRegex = /^https:\/\/mern-exercise-tracker-[a-z0-9]+-.*\.vercel\.app$/;

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || vercelRegex.test(origin)) {
        callback(null, true);
      } else {
        console.error(`CORS not allowed for origin: ${origin}`);
        callback(null, false); 
      }
    },
    credentials: true,
  })
);

// 🎯 FIX: Added the new /auth-config endpoint here
// This route is NOT protected by checkJwt and provides the necessary config to the frontend.
app.get('/auth-config', (req, res) => {
    // These environment variables MUST be set on your Render backend service.
    res.json({
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        audience: process.env.AUTH0_AUDIENCE
    });
});

const checkJwt = auth({
  issuerBaseURL: process.env.AUTH0_ISSUER_URL,
  audience: process.env.AUTH0_AUDIENCE,
});

app.use('/exercises', checkJwt); 

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
  
  const userId = req.auth.payload.sub;

  const newExercise = await createExercise(req.body, userId);
  res.status(201).json(newExercise);
}));

app.get('/exercises', asyncHandler(async (req, res) => {
  const userId = req.auth.payload.sub;
  
  const allExercises = await getAllExercises(userId);
  res.status(200).json(allExercises);
}));

app.get('/exercises/:_id', asyncHandler(async (req, res) => {
  const userId = req.auth.payload.sub;
  
  const doc = await getExerciseById(req.params._id, userId);
  
  if (!doc) return res.status(404).json({ Error: "Not found or not authorized" });
  res.status(200).json(doc);
}));

app.put('/exercises/:_id', asyncHandler(async (req, res) => {
  if (!validateRequest(req.body)) return res.status(400).json({ Error: "Invalid request" });
  
  const userId = req.auth.payload.sub;
  
  const updated = await updateExerciseById(req.params._id, req.body, userId);
  
  if (!updated) return res.status(404).json({ Error: "Not found or not authorized" });
  res.status(200).json(updated);
}));

app.delete('/exercises/:_id', asyncHandler(async (req, res) => {
  console.log('Attempting to delete exercise with ID:', req.params._id);
  
  const userId = req.auth.payload.sub;
  
  const deleted = await deleteExerciseById(req.params._id, userId);
  
  if (!deleted) return res.status(404).json({ Error: "Not found or not authorized" });
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