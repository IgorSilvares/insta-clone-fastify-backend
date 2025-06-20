import type { FastifyInstance, FastifyPluginAsync } from "fastify"
import { reelsService } from "./reels.service"
import { CreateReelBody } from "./reels.types"

const reelsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const service = reelsService(fastify)

    fastify.post<{ Body: CreateReelBody }>("/reels", async (request, reply) => {
        const newReel = await service.create(request.body)

        // Return a 201 Created status code with the new reel object
        return reply.code(201).send(newReel)
    })

    fastify.get("/reels/grid", async (request, reply) => {
        const reels = await service.getAll()

        // Return a 200 Succes status code with the reels object
        return reply.code(200).send(reels)
    })
}

export { reelsRoutes }
