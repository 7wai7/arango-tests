import z from "zod";

export const CreatePostSchema = z.object({
    content: z.string().max(2000).optional(),

    media: z
        .object({
            mimeType: z.enum(["image", "video"]),
            url: z.url(),
        })
        .optional(),
});