import app from "./app.js";
import dotenv from "dotenv";
import db from "./config/firebase.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await db.listCollections();

    console.log("Connected to Firestore successfully!");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to Firestore");
    console.error(error);
  }
};

startServer();
