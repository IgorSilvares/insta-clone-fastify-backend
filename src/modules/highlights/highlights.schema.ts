import { z } from "zod"

export const highlightsSchema = z.object({
    id: z.number().int().positive(),
    cover_image_url: z.string().url("Must be a valid image URL"),
    title: z.string(),
})

export type Highlight = z.infer<typeof highlightsSchema>

export interface HighlightCreationInput {
    cover_img_url: string
    title: string
}

export interface HighlightParams {
    id: string
}
