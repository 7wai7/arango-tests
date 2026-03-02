import { Database } from "arangojs";

export default async function createUsers(db: Database) {
  const usersCollection = db.collection("users");

  const exists = await usersCollection.exists();
  if (!exists) await db.createCollection("users");

  await usersCollection.ensureIndex({
    type: "persistent",
    fields: ["email"],
    unique: true,
  });

  await usersCollection.ensureIndex({
    type: "persistent",
    fields: ["username"],
    unique: true,
  });
}