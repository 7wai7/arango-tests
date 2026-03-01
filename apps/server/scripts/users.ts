import { Database } from "arangojs";

export default async function createUsers(db: Database) {
  const usersCollection = db.collection("users");

  const exists = await usersCollection.exists();
  if (!exists) await db.createCollection("users");

  await usersCollection.ensureIndex({
    type: "persistent",
    fields: ["email", "username"],
    unique: true,
  });

  await usersCollection.save({
    username: "Alice",
    email: "alice@test.com",
    passwordHash: "",
    about: "",
    lastOnlineDate: new Date().toISOString(),
    isOnline: false,
    avatarUrl: "",
    createdAt: new Date().toISOString(),
  });
}