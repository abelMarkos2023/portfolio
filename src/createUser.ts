
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./models/User";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
const MONGO_URI = process.env.MONGODB_URI!;



async function createUser() {
  await mongoose.connect(MONGO_URI);

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const user = await User.create({
    email: "abel2@admin.com",
    password:hashedPassword,
  });

  console.log("User created:", user);
  await mongoose.disconnect();
}

createUser();
