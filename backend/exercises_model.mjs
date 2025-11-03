import mongoose from 'mongoose';
import 'dotenv/config';

let connection;


const exerciseSchema = new mongoose.Schema({
  ownerId: { type: String, required: true, index: true }, 
  
  name: { type: String, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  unit: { type: String, enum: ['kgs', 'lbs'], required: true },
  date: { type: String, required: true }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);


async function connect() {
  try {
    connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
    console.log("Successfully connected to MongoDB using Mongoose!");
  } catch (err) {
    console.log(err);
    throw Error(`Could not connect to MongoDB: ${err.message}`);
  }
}

async function createExercise(data, ownerId) {
  const newExercise = new Exercise({ ...data, ownerId });
  return await newExercise.save();
}

async function getAllExercises(ownerId) {
  return await Exercise.find({ ownerId });
}

async function getExerciseById(id, ownerId) {
  return await Exercise.findOne({ _id: id, ownerId });
}

async function updateExerciseById(id, data, ownerId) {
  return await Exercise.findOneAndUpdate(
    { _id: id, ownerId }, 
    data, 
    { new: true }
  );
}

async function deleteExerciseById(id, ownerId) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Exercise.findOneAndDelete({ _id: id, ownerId });
}

export {
  connect,
  createExercise,
  getAllExercises,
  getExerciseById,
  updateExerciseById,
  deleteExerciseById
};