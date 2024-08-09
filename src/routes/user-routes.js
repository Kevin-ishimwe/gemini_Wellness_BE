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
const router = express.Router();

router.get("/user/all", authMiddleware, getAllUsers);
router.get("/user/:userId", getSingleUser);
router.put("/user/update/:userId", userUpdate);
router.delete("/user/:userId", authMiddleware, deleteUser);
router.post("/user/add", userAdd);
router.post("/user/login", loginUser);


router.post(
  "/user/auth/complete",
  GoogleAuthHandler
);

module.exports = router;
