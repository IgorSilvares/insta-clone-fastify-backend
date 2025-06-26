import { type FastifyInstance } from "fastify"
import { HighlightItemCreationInput } from "./highlightsItemsSchema"

export const highlightItemService = (fastify: FastifyInstance) => {
    return {
        create: async (highlightItemData: HighlightItemCreationInput) => {
            fastify.log.info(`Creating Highlight Item`)
            const highlighthItem =
                fastify.transactions.highlightItems.create(highlightItemData)
            return highlighthItem
        },

        getByHighlightId: async (highLightId: number) => {
            fastify.log.info(`Getting highlight with id: ${highLightId}`)
            const highlight =
                fastify.transactions.highlightItems.getByHighlightId(
                    highLightId
                )
            return highlight
        },

        getById: async (id: number) => {
            fastify.log.info(`Getting Highlight Item with id: ${id}`)
            const highlightItem =
                fastify.transactions.highlightItems.getById(id)
            return highlightItem
        },
    }
}
