import type { FastifyInstance, FastifyPluginAsync } from "fastify"
import { reelsService, Reel } from "./reels.service" // Import Reel (for response type hint)

// Define a type for the request body
type CreateReelBody = {
    video_url: string
    description: string | null
}

const reelsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const service = reelsService(fastify)

    fastify.post<{ Body: CreateReelBody }>("/reels", async (request, reply) => {
        const newReel = await service.create(request.body)

        // Return a 201 Created status code with the new reel object
        return reply.code(201).send(newReel)
    })

    fastify.get("/reels/grid", async (request, reply) => {
        const reels = await service.getAll()

        // Return a 200 status code with all reels
        return reply.code(200).send(reels)
    })
}

export { reelsRoutes }
