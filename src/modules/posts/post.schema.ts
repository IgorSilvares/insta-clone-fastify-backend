import { z } from "zod"

export const postSchema = z.object({
    id: z.number().int().positive(),
    img_url: z.string().url("Must be a valid image URL"),
    caption: z.string().nullable(),
    created_at: z.string().datetime(),
})

export type Post = z.infer<typeof postSchema>

export interface PostCreationInput {
    img_url: string
    caption: string | null
}
