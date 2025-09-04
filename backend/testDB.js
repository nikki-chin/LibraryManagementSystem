import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";


mongoose.connect(mongoDBURL)
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.error("MongoDB connection failed:", err));
