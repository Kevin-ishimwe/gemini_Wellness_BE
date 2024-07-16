import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const hashPassword = async (text) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(text, salt);
  } catch (error) {
    console.log(error);
    throw new Error("hashing failed ");
  }
};

export const generateToken = async (email, password) => {
  try {
    return jwt.sign(
      { userId: email, email: password },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  } catch (error) {
    throw new Error("generating token failed ");
  }
};
