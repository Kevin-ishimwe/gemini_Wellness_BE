import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    personalInfo: {
      username: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      dateOfBirth: Date,
      gender: String,
      password: {
        type: String,
        required: true,
      },
    },

    physicalActivity: {
      steps: [{ date: Date, count: Number }],
      distance: [{ date: Date, kilometers: Number }],
      caloriesBurned: [{ date: Date, amount: Number }],
      activeMinutes: [{ date: Date, minutes: Number }],
      exercises: [
        {
          date: Date,
          type: String,
          duration: Number,
          caloriesBurned: Number,
        },
      ],
    },

    sleep: [
      {
        date: Date,
        duration: Number,
        quality: { type: Number, min: 1, max: 10 },
        bedtime: Date,
        wakeTime: Date,
      },
    ],

    nutrition: {
      meals: [
        {
          date: Date,
          name: String,
          calories: Number,
          protein: Number,
          carbs: Number,
          fats: Number,
        },
      ],
      waterIntake: [{ date: Date, amount: Number }],
    },

    vitalSigns: [
      {
        date: Date,
        heartRate: Number,
        bloodPressure: {
          systolic: Number,
          diastolic: Number,
        },
        bodyTemperature: Number,
        respiratoryRate: Number,
      },
    ],

    weightManagement: [
      {
        date: Date,
        weight: Number,
        bmi: Number,
        bodyFatPercentage: Number,
        measurements: {
          waist: Number,
          chest: Number,
          hips: Number,
        },
      },
    ],

    symptoms: [
      {
        date: Date,
        mood: { type: Number, min: 1, max: 10 },
        energyLevel: { type: Number, min: 1, max: 10 },
        pain: {
          level: { type: Number, min: 1, max: 10 },
          location: String,
        },
      },
    ],

    goals: [
      {
        type: String,
        target: String,
        startDate: Date,
        endDate: Date,
        progress: Number,
      },
    ],

    medications: [
      {
        name: String,
        dosage: String,
        frequency: String,
        startDate: Date,
        endDate: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
