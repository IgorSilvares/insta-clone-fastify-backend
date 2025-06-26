import { type FastifyInstance } from "fastify"
import { HighlightCreationInput } from "./highlights.schema"

export const highlightsService = (fastify: FastifyInstance) => {
    return {
        create: async (highlightData: HighlightCreationInput) => {
            fastify.log.info(`Creating a new highlight`)

            const highlight =
                fastify.transactions.highlights.create(highlightData)
            return highlight
        },

        getAll: async () => {
            fastify.log.info(`Getting all highlights`)
            const highlights = fastify.transactions.highlights.getAll()
            return highlights
        },

        getById: async (id: number) => {
            fastify.log.info(`Getting hightlight with ID: ${id}`)
            const highlight = fastify.transactions.highlights.getById(id)
            return highlight
        },
    }
}
