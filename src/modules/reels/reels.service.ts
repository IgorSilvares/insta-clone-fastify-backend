import type { FastifyInstance } from "fastify"
import { ReelCreationInput } from "./reels.schema"

export const reelsService = (fastify: FastifyInstance) => {
    return {
        create: async (reelData: ReelCreationInput) => {
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
