import express from "express";
import {
  userAdd,
  userUpdate,
  getAllUsers,
  getSingleUser,
  deleteUser,
  loginUser,
  GoogleAuthHandler,
} from "../controllers/user-controller";
import { authMiddleware } from "../middleware/jwt-config";
import passport from "passport";
const router = express.Router();

router.get("/user/all", authMiddleware, getAllUsers);
router.get("/user/:userId", authMiddleware, getSingleUser);
router.put("/user/update/:userId", authMiddleware, userUpdate);
router.delete("/user/:userId", authMiddleware, deleteUser);
router.post("/user/add", authMiddleware, userAdd);
router.post("/user/login", loginUser);
// Google authentication routes
router.get(
  "/user/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/user/auth/complete",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  GoogleAuthHandler
);

module.exports = router;
