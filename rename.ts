import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGO_URI = process.env.MONGODB_URI!;

async function renameField() {
  await mongoose.connect(MONGO_URI);

  const usersCollection = mongoose.connection.collection("users");

  const result = await usersCollection.updateMany(
    { hashedPassword: { $exists: true } },
    [{ $set: { password: "$hashedPassword" } }, { $unset: "hashedPassword" }]
  );

  console.log(`${result.modifiedCount} user(s) updated.`);

  await mongoose.disconnect();
}

renameField();
