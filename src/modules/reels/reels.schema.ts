import { z } from "zod"

export const reelSchema = z.object({
    id: z.number().int().positive(),
    video_url: z.string().url("Must be a valid video URL"),
    thumbnail_url: z.string().url("Must be a valid thumbnail URL"),
    description: z.string().nullable(),
    views: z.number().int().min(0).default(0),
    created_at: z.string().datetime(),
})

export type reels = z.infer<typeof reelSchema>

export interface ReelCreationInput {
    video_url: string
    thumbnail_url: string
    description: string | null
}
