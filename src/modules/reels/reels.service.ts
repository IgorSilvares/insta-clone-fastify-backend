import type { FastifyInstance } from "fastify"

export interface Reel {
    id: number
    video_url: string
    description: string | null
    views: number
    created_at: string
}

// Define a type for the data needed to create a reel
type CreateReelData = {
    video_url: string
    description: string | null
}

export const reelsService = (fastify: FastifyInstance) => {
    return {
        create: async (reelData: CreateReelData) => {
            fastify.log.info(`Creating a new reel`)
            const reel = fastify.transactions.reels.create(reelData)
            return reel
        },

        getAll: async () => {
            fastify.log.info(`Getting all reels`)
            const reels = fastify.transactions.reels.getAll()
            fastify.log.info(
                `Retrieved reels from transactions: ${JSON.stringify(reels)}`
            )
            return reels
        },
    }
}
