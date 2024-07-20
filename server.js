import express from "express";
import "dotenv/config";
import cors from "cors";
import geminiRoutes from "./src/routes/gemini-routes";
import userRoutes from "./src/routes/user-routes";
import mongoose from "mongoose";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const app = express();
//middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//passport
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:2020/user/auth/complete",
    },
    function (accessToken, refreshToken, profile, cb) {
      // Here you would find or create a user in your database
    
      return cb(null, profile);
    }
  )
);

app.use(geminiRoutes);
app.use(userRoutes);



//routes

app.use("*", async (req, res) => {
  res.status(404).json({
    message: "This endpoint does not exist, check docs",
    status: "Not found",
  });
});

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL).then(() => {
  app.listen(PORT, () => {
    console.log("listening on port", PORT);
  });
});
