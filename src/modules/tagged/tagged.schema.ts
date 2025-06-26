import { z } from "zod"

export const taggedPostUserCreationInputSchema = z.object({
    post_id: z.number().int().positive("Post ID must be a positive integer"),
    tagged_username: z
        .string()
        .min(3, "Tagged username needs at least 3 chars")
        .max(50, "Username too long"),
})

export type TaggedPostUserCreationInput = z.infer<
    typeof taggedPostUserCreationInputSchema
>

export const postTaggedByUserSchema = z.object({
    tag_id: z.number().int().positive(),
    post_id: z.number().int().positive(),
    img_url: z.string().url("Must be a valid image URL"),
    caption: z.string().nullable(),
    created_at: z.string().datetime(),
    post_owner_id: z.number().int().positive(),
})

export type postTaggedByUserSchema = z.infer<typeof postTaggedByUserSchema>

export const taggedPostParamsSchema = z.object({
    userId: z
        .string()
        .refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, {
            message: "ID must be a positive integer string",
        }),
    username: z.string(),
})

export type TaggedPostsParams = z.infer<typeof taggedPostParamsSchema>
