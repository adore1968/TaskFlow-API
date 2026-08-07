import db from "../config/firebase.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { cookieOptions } from "../utils/cookie.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userFound = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (!userFound.empty) {
      return res.status(401).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRef = await db.collection("users").add({
      username,
      email,
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
    });

    const user = {
      id: userRef.id,
      username: username,
      email: email,
      role: "user",
    };

    const token = generateToken({ id: user.id, email: user.email });

    res.cookie("token", token, cookieOptions);

    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userSnapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (userSnapshot.empty) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const userDoc = userSnapshot.docs[0];

    const userData = userDoc.data();

    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = {
      id: userDoc.id,
      username: userData.username,
      email: userData.email,
      role: userData.role,
    };

    const token = generateToken({ id: user.id, email: user.email });

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const profile = async (req, res) => {
  try {
    const userDoc = await db.collection("users").doc(req.user.id).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = userDoc.data();

    const user = {
      id: userDoc.id,
      username: userData.username,
      email: userData.email,
      role: userData.role,
    };

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
