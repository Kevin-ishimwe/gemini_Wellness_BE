const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // Personal Information
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfBirth: Date,
  gender: String,
  // Health Tracking
  weight: [{ value: Number, date: Date }],
  height: Number,
  bloodPressure: [{ systolic: Number, diastolic: Number, date: Date }],
  heartRate: [{ value: Number, date: Date }],
  sleepHours: [{ hours: Number, date: Date }],

  // Mental Health
  moodLog: [{ mood: String, intensity: Number, date: Date }],
  stressLevel: [{ level: Number, date: Date }],

  // Fitness
  exerciseLog: [
    {
      type: String,
      duration: Number,
      caloriesBurned: Number,
      date: Date,
    },
  ],

  // Nutrition
  dietaryRestrictions: [String],
  calorieIntake: [{ value: Number, date: Date }],

  // Appointments (for patients)
  appointments: [
    {
      therapistId: Schema.Types.ObjectId,
      date: Date,
      notes: String,
    },
  ],

  // Settings
  notificationPreferences: {
    email: Boolean,
    push: Boolean,
    sms: Boolean,
  },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
