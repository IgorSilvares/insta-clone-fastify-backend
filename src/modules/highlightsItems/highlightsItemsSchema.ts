import { z } from "zod"

export const highlightItemSchema = z.object({
    id: z.number().int().positive(),
    highlight_id: z.number().int().positive(),
    item_type: z.enum(["image", "video"]),
    content_url: z.string().url("Content URL must be a valid URL"),
    caption: z.string().nullable().optional(),
    created_at: z.string().datetime().optional(),
})
export type HighlightItem = z.infer<typeof highlightItemSchema>

export const highlightItemCreationInputSchema = z.object({
    highlight_id: z.number().int().positive(),
    item_type: z.enum(["image", "video"]),
    content_url: z.string().url("Content URL must be a valid URL"),
    caption: z.string().nullable(),
})

export type HighlightItemCreationInput = z.infer<
    typeof highlightItemCreationInputSchema
>

export const highlightItemParamsSchema = z.object({
    id: z
        .string()
        .refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, {
            message: "ID must be a positive integer string",
        }),
})

export type HighlightItemParams = z.infer<typeof highlightItemParamsSchema>
