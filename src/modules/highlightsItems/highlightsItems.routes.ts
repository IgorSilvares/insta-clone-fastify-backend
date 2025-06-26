import { FastifyInstance, FastifyPluginAsync } from "fastify"
import { highlightItemService } from "./highlightsItems.service"
import {
    HighlightItemCreationInput,
    HighlightItemParams,
} from "./highlightsItemsSchema"

const highlightItemsRoutes: FastifyPluginAsync = async (
    fastify: FastifyInstance
) => {
    const service = highlightItemService(fastify)

    fastify.post<{ Body: HighlightItemCreationInput }>(
        "/highlightsItems",
        async (request, reply) => {
            const newHighlightItem = await service.create(request.body)

            return reply.code(201).send(newHighlightItem)
        }
    )

    fastify.get<{ Params: HighlightItemParams }>(
        "/highlightsItems/:id",
        async (request, reply) => {
            const id = parseInt(request.params.id)
            const highlightItem = await service.getById(id)

            return reply.code(200).send(highlightItem)
        }
    )
}

export { highlightItemsRoutes }
