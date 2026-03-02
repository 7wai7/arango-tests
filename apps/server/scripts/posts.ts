import { Database } from "arangojs";

export default async function createPosts(db: Database) {
    const posts = db.collection("posts");

    if (!(await posts.exists())) {
        await db.createCollection("posts");
    }

    // feed queries
    await posts.ensureIndex({
        type: "persistent",
        fields: ["userId", "createdAt"],
    });

    // sorting feed
    await posts.ensureIndex({
        type: "persistent",
        fields: ["createdAt"],
    });
}