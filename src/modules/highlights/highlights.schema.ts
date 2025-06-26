import { z } from "zod"

export const highlightSchema = z.object({
    id: z.number().int().positive(),
    user_id: z.number().int().positive(),
    cover_img_url: z.string().url("Must be a valid image URL"),
    title: z.string().min(1, "Title cannot be empty"),
    created_at: z.string().datetime().optional(),
})
export type Highlight = z.infer<typeof highlightSchema>

export const highlightCreationInputSchema = z.object({
    user_id: z.number().int().positive(),
    cover_img_url: z.string().url(`Must be a valid image URL`),
    title: z.string(),
})

export type HighlightCreationInput = z.infer<
    typeof highlightCreationInputSchema
>

export const highlightParamsSchema = z.object({
    id: z
        .string()
        .refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, {
            message: "ID must be a positive integer string",
        }),
})

export type HighlightParams = z.infer<typeof highlightParamsSchema>
