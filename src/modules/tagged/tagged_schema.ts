import { z } from "zod"

export const tagged_postsSchema = z.object({
    id: z.number().int().positive(),
    image_url: z.string().url("Must be a valid image URL"),
    caption: z.string(),
    who_tagged: z.string(),
})

export type TaggedPost = z.infer<typeof tagged_postsSchema>

export interface taggedPostCreationInput {
    img_url: string
    caption: string
    who_tagged: string
}
