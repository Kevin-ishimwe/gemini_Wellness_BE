import express from "express";
import { userAdd,userUpdate,getAllUsers,getSingleUser } from "../controllers/user-controller";
const router = express.Router();

router.get("/user/all", getAllUsers);
router.get('/user/:userId',getSingleUser)
router.post("/user/add", userAdd);
router.put("/user/update/:userId", userUpdate);


module.exports = router;