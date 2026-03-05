import z from "zod"
import { CreatePostSchema } from "./create-post.schema";
import { UserProfile } from "src/types";

export type CreatePostDTO = z.infer<typeof CreatePostSchema>

export type PostDocument = {
    _key: string;
    content?: string;

    media?: {
        mimeType: "image" | "video";
        url: string;
    };

    likesCount: number;
    commentsCount: number;

    createdAt: string;
    updatedAt: string;
};

export type PostAuthorEdge = {
    _from: string,
    _to: string
}

export type Post = {
    id: string,
    user: UserProfile,
    content: string,
    media?: PostMedia[],
    createdAt: string,
    likes: number
}

export type PostMedia = {
    mimeType: string,
    url: string
}