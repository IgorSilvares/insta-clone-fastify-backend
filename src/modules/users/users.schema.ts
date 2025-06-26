import { z } from "zod"

export const userSchema = z.object({
    id: z.number().int().positive(),
    username: z
        .string()
        .min(3, "Username cannot be empty")
        .max(20, "Username too long"),
    created_at: z.string().datetime().optional(),
})

export type User = z.infer<typeof userSchema>

export const userCreationInputSchema = z.object({
    username: z
        .string()
        .min(3, "Min 3 chars for username")
        .max(20, "Max 20 chars for username"),
})

export type UserCreationInput = z.infer<typeof userCreationInputSchema>

export const usersParamsSchema = z.object({
    id: z
        .string()
        .refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, {
            message: "ID must be a positive integer string",
        }),
})

export type UsersParams = z.infer<typeof usersParamsSchema>
