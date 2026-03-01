import { Database } from "arangojs";
import createUsers from "./users.js";
import "dotenv/config";

const dbName = process.env.ARANGODB_NAME;
let db = new Database({
    url: process.env.ARANGODB_URL,
    auth: {
        username: process.env.ARANGODB_USER,
        password: process.env.ARANGODB_PASSWORD,
    },
});

async function main() {
    const databases = await db.databases();
    const dbNames = databases.map((database) => database.name);

    if (!dbNames.includes(dbName)) {
        await db.createDatabase(dbName);
    }

    db = db.database(dbName);
    await createUsers(db);
}

main()
    .then(() => console.log("✅ db:setup"))
    .catch((e) => {
        // needed so we crash the calling process when we have an error
        process.exitCode = 1;
        console.log(e);
    });
