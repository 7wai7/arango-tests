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

    const edges = db.collection("post_authors");

    if (!(await edges.exists())) {
        await db.createEdgeCollection("post_authors");
    }

    // lookup user posts
    await edges.ensureIndex({
        type: "persistent",
        fields: ["_from"], // save user key
    });

    // lookup post author
    await edges.ensureIndex({
        type: "persistent",
        fields: ["_to"], // save post key
    });
}