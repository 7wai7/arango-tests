import { Database } from "arangojs";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const passwordHash = bcrypt.hashSync("qqqqqq", 10);

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
    _key: uuid(),
    username: "Alice",
    email: "alice@test.com",
    passwordHash,
    about: "",
    lastOnlineDate: new Date().toISOString(),
    avatarUrl: "",
    createdAt: new Date().toISOString(),
  });
}