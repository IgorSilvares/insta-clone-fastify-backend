import { z } from "zod"

export const postSchema = z.object({
    id: z.number().int().positive(),
    user_id: z.number().int().positive(),
    img_url: z.string().url("Must be a valid image URL"),
    caption: z.string().nullable(),
    created_at: z.string().datetime().optional(),
})

export type Post = z.infer<typeof postSchema>

export const postCreationInputSchema = z.object({
    user_id: z.number().int().positive(),
    img_url: z.string().url("Must be a valid image URL"),
    caption: z.string().nullable(),
})

export type PostCreationInput = z.infer<typeof postCreationInputSchema>
