"use strict";

var _express = _interopRequireDefault(require("express"));
var _userController = require("../controllers/user-controller");
var _jwtConfig = require("../middleware/jwt-config");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.get("/user/all", _jwtConfig.authMiddleware, _userController.getAllUsers);
router.get("/user/:userId", _userController.getSingleUser);
router.put("/user/update/:userId", _userController.userUpdate);
router["delete"]("/user/:userId", _jwtConfig.authMiddleware, _userController.deleteUser);
router.post("/user/add", _userController.userAdd);
router.post("/user/login", _userController.loginUser);
router.post("/user/auth/complete", _userController.GoogleAuthHandler);
module.exports = router;