import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercise_db';

let connection;


const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  unit: { type: String, enum: ['kgs', 'lbs'], required: true },
  date: { type: String, required: true }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);


async function connect() {
  try {
    connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, {
      dbName: EXERCISE_DB_NAME
    });
    console.log("Successfully connected to MongoDB using Mongoose!");
  } catch (err) {
    console.log(err);
    throw Error(`Could not connect to MongoDB: ${err.message}`);
  }
}


async function createExercise(data) {
  const newExercise = new Exercise(data);
  return await newExercise.save();
}

async function getAllExercises() {
  return await Exercise.find({});
}

async function getExerciseById(id) {
  return await Exercise.findById(id);
}

async function updateExerciseById(id, data) {
  return await Exercise.findByIdAndUpdate(id, data, { new: true });
}

async function deleteExerciseById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Exercise.findByIdAndDelete(id);
}

export {
  connect,
  createExercise,
  getAllExercises,
  getExerciseById,
  updateExerciseById,
  deleteExerciseById
};