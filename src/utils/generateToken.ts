import jwt from "jsonwebtoken";

export interface TokenPayload {
  id: string;
  email: string;
}

const generateToken = (payload: TokenPayload) => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET no esta definida");
  }

  return jwt.sign(payload, jwtSecret, { expiresIn: "7d" });
};

export default generateToken;
