import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    try {
      const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decoded;
        next();
      } else {
        return res.status(402).json({
          message: "authorization header missing,please login again",
          data: null,
          status: "error",
        });
      }
    } catch (error) {
      return res.status(403).json({
        message: "token unverifiable",
        data: null,
        status: "error",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Authentication failed",
      data: null,
      status: "error",
    });
  }
};
