"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authMiddleware = void 0;
var _request = require("express/lib/request");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var authMiddleware = exports.authMiddleware = function authMiddleware(req, res, next) {
  try {
    try {
      var _req$headers$authoriz;
      var token = (_req$headers$authoriz = req.headers.authorization) === null || _req$headers$authoriz === void 0 ? void 0 : _req$headers$authoriz.split(" ")[1]; // Bearer TOKEN
      if (token) {
        var decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
        req.userData = decoded;
        next();
      } else {
        return res.status(402).json({
          message: "authorization header missing,please login again",
          data: null,
          status: "error"
        });
      }
    } catch (error) {
      return res.status(403).json({
        message: "token unverifiable",
        data: null,
        status: "error"
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Authentication failed",
      data: null,
      status: "error"
    });
  }
};