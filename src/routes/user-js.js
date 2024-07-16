import express from "express";
import { userAdd,userUpdate,getAllUsers,getSingleUser,deleteUser,loginUser } from "../controllers/user-controller";
const router = express.Router();

router.get("/user/all", getAllUsers);
router.get('/user/:userId',getSingleUser)
router.post("/user/add", userAdd);
router.put("/user/update/:userId", userUpdate);
router.delete('/user/:userId',deleteUser)
router.post ('/user/login',loginUser)
module.exports = router;