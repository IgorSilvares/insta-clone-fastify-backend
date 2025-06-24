import { FastifyInstance, FastifyPluginAsync } from "fastify"
import { highlightsService } from "./highlights.service"
import { HighlightCreationInput, HighlightParams } from "./highlights.schema"

const highlightsRoutes: FastifyPluginAsync = async (
    fastify: FastifyInstance
) => {
    const service = highlightsService(fastify)

    fastify.post<{ Body: HighlightCreationInput }>(
        "/highlights",
        async (request, reply) => {
            const newHighlight = await service.create(request.body)

            return reply.code(201).send(newHighlight)
        }
    )

    fastify.get("/highlights", async (request, reply) => {
        const highlights = await service.getAll()

        return reply.code(200).send(highlights)
    })

    fastify.get<{ Params: HighlightParams }>(
        "/highlights/:id",
        async (request, reply) => {
            const id = parseInt(request.params.id)
            const highlight = await service.getById(id)

            return reply.code(200).send(highlight)
        }
    )
}

export { highlightsRoutes }